import { DomainEvent } from '@effectiv-crm/domain';

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}
