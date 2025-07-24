import { DomainEvent } from './domain-event';

export abstract class EventStore {
  abstract saveEvents(aggregateId: string, events: DomainEvent[]): Promise<void>;

  abstract getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]>;
}
