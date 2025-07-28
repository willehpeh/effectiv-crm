import { DomainEvent } from '../../common/domain-event';

export interface ContactRegisteredPayload {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export class ContactRegisteredEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly eventType = 'ContactRegistered';
  readonly occurredOn: string;
  readonly payload: ContactRegisteredPayload;

  constructor(aggregateId: string, payload: ContactRegisteredPayload) {
    this.aggregateId = aggregateId;
    this.aggregateVersion = 1;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }
}
