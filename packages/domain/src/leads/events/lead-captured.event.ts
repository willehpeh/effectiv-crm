import { DomainEvent } from '../../common/domain-event';

export class LeadCapturedEvent implements DomainEvent {
  readonly eventId: string;
  readonly aggregateId: string;
  readonly version: number;
  readonly eventType: string = 'LeadCaptured';
  readonly occurredOn: string;
  readonly payload: object;

  constructor(aggregateId: string, version: number, payload: object, eventId: string = crypto.randomUUID()) {
    this.eventId = eventId;
    this.aggregateId = aggregateId;
    this.version = version;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }

  get type(): string {
    return this.eventType;
  }
}
