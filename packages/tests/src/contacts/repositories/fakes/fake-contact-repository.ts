import { ContactRepository, ContactReadModel } from '@effectiv-crm/application';

export class FakeContactRepository implements ContactRepository {
  private readonly contacts = new Map<string, ContactReadModel>();

  async getContactById(contactId: string): Promise<ContactReadModel | null> {
    return this.contacts.get(contactId) || null;
  }

  addContact(contact: ContactReadModel): void {
    this.contacts.set(contact.id, contact);
  }
}
