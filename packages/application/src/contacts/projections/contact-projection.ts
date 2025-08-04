import { ContactReadModel } from '../read-models/contact-read-model';

export interface ContactProjection {
  getContactById(contactId: string): ContactReadModel | undefined;
  addContact(contact: ContactReadModel): void;
}
