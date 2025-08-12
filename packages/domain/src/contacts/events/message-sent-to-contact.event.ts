import { DomainEvent } from '../../common/domain-event';

export interface MessageSentToContactPayload {
  subject: string;
  body?: string;
  sentAt: string;
  messageChannel: string;
  notes?: string;
}

export class MessageSentToContactEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly eventType = 'MessageSentToContact';
  readonly occurredOn: string;
  readonly aggregateType = 'Contact';
  readonly payload: MessageSentToContactPayload;

  constructor(aggregateId: string, aggregateVersion: number, payload: MessageSentToContactPayload) {
    this.aggregateId = aggregateId;
    this.aggregateVersion = aggregateVersion;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }
}
