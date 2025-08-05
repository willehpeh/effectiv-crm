import { ContactReadModel } from '../read-models/contact-read-model';

export abstract class ContactProjection {
  abstract getContactById(contactId: string): ContactReadModel | undefined;
  abstract addContact(contact: ContactReadModel): void;
  abstract clear(): void;
}
