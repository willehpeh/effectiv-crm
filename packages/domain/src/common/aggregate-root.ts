import { DomainEvent } from './domain-event';
import { ValueObject } from './value-object';

export abstract class AggregateRoot {
  private _uncommittedEvents: DomainEvent[] = [];

  abstract id(): ValueObject<string>;

  protected apply(event: DomainEvent): void {
    this._uncommittedEvents.push(event);
  }

  protected replayEvent(event: DomainEvent): void {
  }

  hydrate(events: DomainEvent[]): void {
    events.forEach(event => this.replayEvent(event));
  }

  getUncommittedEvents(): DomainEvent[] {
    return [...this._uncommittedEvents];
  }

  markEventsAsCommitted(): void {
    this._uncommittedEvents = [];
  }
}
