import { DomainEvent, EventStore } from '@effectiv-crm/domain';

export class FakeEventStore implements EventStore {

  events: DomainEvent[] = [];

  getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]> {
    return Promise.resolve(this.events.filter(event => event.aggregateId === aggregateId));
  }

  saveEvents(events: DomainEvent[]): Promise<void> {
    this.events.push(...events);
    return Promise.resolve();
  }
}
