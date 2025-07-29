import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { EventStore, DomainEvent, AggregateVersionConflictError } from '@effectiv-crm/domain';
import { EventEntity } from './entities/event.entity';
import { EventMetadata } from './event-metadata';

@Injectable()
export class PostgresEventStore extends EventStore {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: EntityRepository<EventEntity>,
    private readonly em: EntityManager
  ) {
    super();
  }

  async saveEvents(events: DomainEvent[]): Promise<void> {
    if (events.length === 0) {
      return;
    }

    // Group events by aggregate ID
    const eventsByAggregate = this.groupEventsByAggregate(events);

    // Validate versions for each aggregate
    for (const [aggregateId, aggregateEvents] of eventsByAggregate) {
      await this.validateAggregateVersions(aggregateId, aggregateEvents);
    }

    // If all validations pass, persist the events
    const eventEntities = events.map(event => this.domainEventToEntity(event));

    for (const entity of eventEntities) {
      this.em.persist(entity);
    }
    await this.em.flush();
  }

  async getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]> {
    const eventEntities = await this.eventRepository.find(
      { aggregateId },
      { orderBy: { aggregateVersion: 'ASC' } }
    );

    return eventEntities.map(entity => this.entityToDomainEvent(entity));
  }

  private domainEventToEntity(domainEvent: DomainEvent): EventEntity {
    // For now, we'll use default metadata values
    // In a real application, this would come from the current context
    const metadata: EventMetadata = {
      ownerId: 'system', // TODO: Get from current user context
      correlationId: crypto.randomUUID() // TODO: Get from current request context
    };

    return new EventEntity(
      domainEvent.aggregateId,
      domainEvent.aggregateVersion,
      domainEvent.eventType,
      domainEvent.occurredOn,
      domainEvent.payload,
      metadata
    );
  }

  private entityToDomainEvent(entity: EventEntity): DomainEvent {
    return {
      aggregateId: entity.aggregateId,
      aggregateVersion: entity.aggregateVersion,
      eventType: entity.eventType,
      occurredOn: entity.occurredOn,
      payload: entity.payload
    };
  }

  private groupEventsByAggregate(events: DomainEvent[]): Map<string, DomainEvent[]> {
    const grouped = new Map<string, DomainEvent[]>();

    for (const event of events) {
      const existing = grouped.get(event.aggregateId) || [];
      existing.push(event);
      grouped.set(event.aggregateId, existing);
    }

    // Sort events within each aggregate by version
    for (const [aggregateId, aggregateEvents] of grouped) {
      aggregateEvents.sort((a, b) => a.aggregateVersion - b.aggregateVersion);
      grouped.set(aggregateId, aggregateEvents);
    }

    return grouped;
  }

  private async validateAggregateVersions(aggregateId: string, events: DomainEvent[]): Promise<void> {
    const currentMaxVersion = await this.getCurrentMaxVersion(aggregateId);
    const expectedFirstVersion = currentMaxVersion + 1;

    this.validateEventsAreInSequence(events, expectedFirstVersion, aggregateId);
  }

  private async getCurrentMaxVersion(aggregateId: string): Promise<number> {
    // Use a more efficient query that only selects the version field
    const result = await this.eventRepository.findOne(
      { aggregateId },
      { 
        fields: ['aggregateVersion'],
        orderBy: { aggregateVersion: 'DESC' }
      }
    );

    return result?.aggregateVersion || 0;
  }

  private validateEventsAreInSequence(events: DomainEvent[], expectedFirstVersion: number, aggregateId: string) {
    for (let i = 0; i < events.length; i++) {
      const expectedVersion = expectedFirstVersion + i;
      if (this.eventHasWrongVersion(events[i], expectedVersion)) {
        throw new AggregateVersionConflictError(
          aggregateId,
          expectedVersion,
          events[i].aggregateVersion
        );
      }
    }
  }

  private eventHasWrongVersion(event: DomainEvent, expectedVersion: number) {
    return event.aggregateVersion !== expectedVersion;
  }
}
