import { Signal } from '@angular/core';
import { RegisterContactDto, ContactReadModel } from '@effectiv-crm/application';

export abstract class ContactsFacade {
  abstract contacts: Signal<ContactReadModel[]>;
  abstract loading: Signal<boolean>;
  abstract error: Signal<string>;

  abstract loadContacts(): void;
  abstract registerContact(contactDto: RegisterContactDto): void;
}
