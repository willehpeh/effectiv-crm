import { ContactReadModel } from '../read-models/contact.read-model';

export abstract class ContactProjection {
  abstract contactById(contactId: string): ContactReadModel | undefined;
  abstract getAllContacts(): ContactReadModel[];
}
