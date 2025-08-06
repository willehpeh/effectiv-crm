import { ContactProjection } from '@effectiv-crm/application';
import { ContactReadModel } from '@effectiv-crm/application';

export class FakeContactProjection implements ContactProjection {
  private contacts: ContactReadModel[] = [];

  contactById(contactId: string): ContactReadModel | undefined {
    return this.contacts.find(contact => contact.id === contactId);
  }

  addContact(contact: ContactReadModel): void {
    this.contacts.push(contact);
  }

  clear(): void {
    this.contacts = [];
  }
}
