import { ContactReadModel } from '../queries/contact-read-model';

export interface ContactRepository {
  getContactById(contactId: string): Promise<ContactReadModel | null>;
}
