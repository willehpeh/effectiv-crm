import { DomainEvent } from '../../common/domain-event';

export interface LeadCapturedPayload {
  contactId: string;
  source: string;
  contactDate: string;
  details: string;
  referrer?: string;
}

export class LeadCapturedEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly eventType: string = 'LeadCaptured';
  readonly occurredOn: string;
  readonly aggregateType: string = 'Lead';
  readonly payload: LeadCapturedPayload;

  constructor(aggregateId: string, payload: LeadCapturedPayload, version = 1) {
    this.aggregateId = aggregateId;
    this.aggregateVersion = version;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }

  get type(): string {
    return this.eventType;
  }
}
