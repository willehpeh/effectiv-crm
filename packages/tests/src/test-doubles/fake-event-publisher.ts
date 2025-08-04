import { EventPublisher } from '@effectiv-crm/application';

export interface PublishedEvent {
  eventType: string;
  payload: unknown;
}

export class FakeEventPublisher implements EventPublisher {
  public publishedEvents: PublishedEvent[] = [];

  async publish(eventType: string, payload: unknown): Promise<void> {
    this.publishedEvents.push({
      eventType,
      payload
    });
  }

  clear(): void {
    this.publishedEvents = [];
  }

  getLastPublishedEvent(): PublishedEvent | undefined {
    return this.publishedEvents[this.publishedEvents.length - 1];
  }

  getPublishedEventsOfType(eventType: string): PublishedEvent[] {
    return this.publishedEvents.filter(event => event.eventType === eventType);
  }
}
