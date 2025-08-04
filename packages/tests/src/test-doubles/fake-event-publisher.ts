import { EventPublisher } from '@effectiv-crm/application';
import { DomainEvent } from '@effectiv-crm/domain';

export class FakeEventPublisher implements EventPublisher {
  public publishedEvents: DomainEvent[] = [];

  async publish(event: DomainEvent): Promise<void> {
    this.publishedEvents.push(event);
  }

  clear(): void {
    this.publishedEvents = [];
  }

  getLastPublishedEvent(): DomainEvent | undefined {
    return this.publishedEvents[this.publishedEvents.length - 1];
  }

  getPublishedEventsOfType(eventType: string): DomainEvent[] {
    return this.publishedEvents.filter(event => event.eventType === eventType);
  }
}
