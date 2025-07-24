import { DomainEvent } from './domain-event';
import { ValueObject } from './value-object';

export abstract class AggregateRoot {
  private _uncommittedEvents: DomainEvent[] = [];
  private _version: number = 0;

  abstract id(): ValueObject<string>;

  protected apply(event: DomainEvent): void {
    this._version++;
    const versionedEvent = { ...event, version: this._version };
    this._uncommittedEvents.push(versionedEvent);
    this.replayEvent(versionedEvent);
  }

  protected get version(): number {
    return this._version;
  }

  protected abstract replayEvent(event: DomainEvent): void;

  hydrate(events: DomainEvent[]): void {
    events.forEach(event => {
      this.replayEvent(event);
      this._version = event.version;
    });
  }

  getUncommittedEvents(): DomainEvent[] {
    return [...this._uncommittedEvents];
  }

  markEventsAsCommitted(): void {
    this._uncommittedEvents = [];
  }
}
