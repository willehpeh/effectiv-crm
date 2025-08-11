import { DomainEvent } from '../../common/domain-event';

export interface EmailSentToContactPayload {
  subject: string;
  body?: string;
  sentAt: Date;
  senderEmail: string;
  notes?: string;
}

export class EmailSentToContactEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly eventType = 'EmailSentToContact';
  readonly occurredOn: string;
  readonly aggregateType = 'Contact';
  readonly payload: EmailSentToContactPayload;

  constructor(aggregateId: string, aggregateVersion: number, payload: EmailSentToContactPayload) {
    this.aggregateId = aggregateId;
    this.aggregateVersion = aggregateVersion;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }
}
