import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContactRegisteredEvent, DomainEvent } from '@effectiv-crm/domain';
import { ContactProjection } from '../projections/contact.projection';
import { ContactReadModel } from '../read-models/contact.read-model';

@Injectable()
@EventsHandler(ContactRegisteredEvent)
export class ContactRegisteredHandler implements IEventHandler<ContactRegisteredEvent> {
  constructor(private readonly contactProjection: ContactProjection) {}

  handle(event: ContactRegisteredEvent): void {
    const contactReadModel: ContactReadModel = {
      id: event.aggregateId,
      name: `${event.payload.firstName} ${event.payload.lastName}`,
      email: event.payload.email,
    };

    this.contactProjection.addContact(contactReadModel);
  }

  rebuild(events: DomainEvent[]): void {
    const contactRegisteredEvents = events.filter(event => event.eventType === 'ContactRegistered');

    for (const event of contactRegisteredEvents) {
      this.handle(event as ContactRegisteredEvent);
    }
  }
}
