import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '@effectiv-crm/domain';
import { EventPublisher } from '@effectiv-crm/application';

@Injectable()
export class NestjsEventPublisher implements EventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  async publish(event: DomainEvent): Promise<void> {
    this.eventBus.publish(event);
  }
}
