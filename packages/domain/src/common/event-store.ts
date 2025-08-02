import { DomainEvent } from './domain-event';

export abstract class EventStore {
  abstract saveEvents(events: DomainEvent[]): Promise<void>;

  abstract getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]>;

  abstract getEventsByAggregateType(aggregateType: string): Promise<DomainEvent[]>;
}
