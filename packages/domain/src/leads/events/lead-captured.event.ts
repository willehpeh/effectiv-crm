import { DomainEvent } from '../../common/domain-event';

export class LeadCapturedEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly version: number;
  readonly eventType: string = 'LeadCaptured';
  readonly occurredOn: string;
  readonly payload: object;

  constructor(aggregateId: string, payload: object, version = 1) {
    this.aggregateId = aggregateId;
    this.version = version;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }

  get type(): string {
    return this.eventType;
  }
}
