import { DomainEvent } from '../../common/domain-event';

export interface LeadCapturedPayload {
  contactId: string;
}

export class LeadCapturedEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly version: number;
  readonly eventType: string = 'LeadCaptured';
  readonly occurredOn: string;
  readonly payload: LeadCapturedPayload;

  constructor(aggregateId: string, payload: LeadCapturedPayload, version = 1) {
    this.aggregateId = aggregateId;
    this.version = version;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }

  get type(): string {
    return this.eventType;
  }
}
