import { DomainEvent } from '../../common/domain-event';

export class ContactRegisteredEvent implements DomainEvent {
  readonly aggregateId: string;
  readonly version: number;
  readonly eventType = 'ContactRegistered';
  readonly occurredOn: string;
  readonly payload: object;

  constructor(aggregateId: string, payload: object) {
    this.aggregateId = aggregateId;
    this.version = 1;
    this.occurredOn = new Date().toISOString();
    this.payload = payload;
  }
}
