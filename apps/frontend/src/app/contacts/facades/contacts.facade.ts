import { Signal } from '@angular/core';
import { RegisterContactDto, ContactReadModel } from '@effectiv-crm/application';

export abstract class ContactsFacade {
  abstract contacts: Signal<ContactReadModel[]>;
  abstract loading: Signal<boolean>;
  abstract error: Signal<string>;

  abstract loadContacts(): void;
  abstract registerContact(contactDto: RegisterContactDto): void;
  abstract recordMessageSent(contactId: string, subject: string, body?: string, messageChannel?: string, notes?: string, sentAt?: string): void;
}
