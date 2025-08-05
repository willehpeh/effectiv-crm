import { Injectable } from '@nestjs/common';
import { ContactProjection, ContactReadModel } from '@effectiv-crm/application';

@Injectable()
export class InMemoryContactProjection implements ContactProjection {
  private readonly contacts = new Map<string, ContactReadModel>();

  getContactById(contactId: string): ContactReadModel | undefined {
    return this.contacts.get(contactId);
  }

  addContact(contact: ContactReadModel): void {
    this.contacts.set(contact.id, contact);
  }
}
