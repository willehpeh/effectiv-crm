import { DomainEvent, EventStore } from '@effectiv-crm/domain';

export class FakeEventStore implements EventStore {

  events: DomainEvent[] = [];

  getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]> {
    return Promise.resolve(this.events.filter(event => event.aggregateId === aggregateId));
  }

  saveEvents(aggregateId: string, events: DomainEvent[]): Promise<void> {
    if (this.containsEventForWrongAggregate(events, aggregateId)) {
      throw new Error('All events do not match aggregate ID');
    }
    this.events.push(...events);
    return Promise.resolve();
  }

  private containsEventForWrongAggregate(events: DomainEvent[], aggregateId: string) {
    return events.some(event => event.aggregateId !== aggregateId);
  }
}
