import { DomainEvent } from './domain-event';

export abstract class EventStore {
  abstract saveEvents(events: DomainEvent[]): Promise<void>;
  abstract eventsForAggregate(aggregateId: string): Promise<DomainEvent[]>;
  abstract allEvents(): Promise<DomainEvent[]>;
}
