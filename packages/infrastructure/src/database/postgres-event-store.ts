import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import {
  AggregateVersionConflictError,
  AuthContext,
  DomainEvent,
  EventStore,
  RequestContext
} from '@effectiv-crm/domain';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class PostgresEventStore extends EventStore {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: EntityRepository<EventEntity>,
    private readonly em: EntityManager
  ) {
    super();
  }

  async saveEvents(events: DomainEvent[], authContext: AuthContext, requestContext: RequestContext): Promise<void> {
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
    const eventEntities = events.map(event =>
      this.domainEventToEntity(event, authContext, requestContext)
    );

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

  private domainEventToEntity(domainEvent: DomainEvent, authContext: AuthContext, requestContext: RequestContext): EventEntity {
    return new EventEntity(
      domainEvent.aggregateId,
      domainEvent.aggregateVersion,
      domainEvent.eventType,
      domainEvent.occurredOn,
      domainEvent.payload,
      {
        ownerId: authContext.userId(),
        correlationId: requestContext.correlationId()
      }
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
