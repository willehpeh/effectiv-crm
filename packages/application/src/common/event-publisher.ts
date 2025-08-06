import { DomainEvent } from '@effectiv-crm/domain';

export abstract class EventPublisher {
  abstract publish(event: DomainEvent): void;
}
