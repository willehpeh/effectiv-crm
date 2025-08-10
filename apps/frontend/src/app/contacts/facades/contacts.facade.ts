import { RegisterContactDto } from '@effectiv-crm/application';

export abstract class ContactsFacade {
  abstract registerContact(contactDto: RegisterContactDto): void;
}
