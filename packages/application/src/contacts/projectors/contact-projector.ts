import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContactRegisteredEvent, DomainEvent } from '@effectiv-crm/domain';
import { ContactProjection } from '../projections/contact-projection';
import { ContactReadModel } from '../read-models/contact-read-model';

@Injectable()
@EventsHandler(ContactRegisteredEvent)
export class ContactProjector implements IEventHandler<ContactRegisteredEvent> {
  constructor(private readonly contactProjection: ContactProjection) {}

  handleContactRegistered(event: ContactRegisteredEvent): void {
    const contactReadModel: ContactReadModel = {
      id: event.aggregateId,
      name: `${event.payload.firstName} ${event.payload.lastName}`,
      email: event.payload.email,
    };

    this.contactProjection.addContact(contactReadModel);
  }

  handle(event: ContactRegisteredEvent): void {
    this.handleContactRegistered(event);
  }

  async rebuild(events: DomainEvent[]): Promise<void> {
    this.contactProjection.clear();
    
    const contactEvents = events.filter(event => event.eventType === 'ContactRegistered');
    
    for (const event of contactEvents) {
      this.handle(event as ContactRegisteredEvent);
    }
  }
}
