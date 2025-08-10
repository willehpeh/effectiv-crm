import { Injectable } from '@nestjs/common';
import { ContactProjection, ContactReadModel } from '@effectiv-crm/application';
import { ProjectionEventStream } from '../events/projection.event-stream';
import { filter, tap } from 'rxjs';
import { ContactRegisteredEvent } from '@effectiv-crm/domain';

@Injectable()
export class InMemoryContactProjection implements ContactProjection {
  private readonly contacts = new Map<string, ContactReadModel>();

  private readonly handledEvents = [
    'ContactRegistered'
  ];

  constructor(private readonly events: ProjectionEventStream) {
    this.events.stream$().pipe(
      filter(event => this.handledEvents.includes(event.eventType)),
      tap(event => {
        switch (event.eventType) {
          case 'ContactRegistered':
            this.registerContact(event as ContactRegisteredEvent);
            break;
          default:
            return;
        }
      })
    ).subscribe();
  }

  contactById(contactId: string): ContactReadModel | undefined {
    return this.contacts.get(contactId);
  }

  getAllContacts(): ContactReadModel[] {
    return Array.from(this.contacts.values());
  }

  private registerContact(event: ContactRegisteredEvent): void {
    const readModel: ContactReadModel = {
      id: event.aggregateId,
      name: `${ event.payload.firstName } ${ event.payload.lastName }`,
      email: event.payload.email,
      company: event.payload.company,
    };
    this.addContact(readModel);
  }

  private addContact(contact: ContactReadModel): void {
    this.contacts.set(contact.id, contact);
  }
}
