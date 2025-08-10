import { inject, Injectable, Signal } from '@angular/core';
import { ContactsFacade } from './contacts.facade';
import { RegisterContactDto, ContactReadModel } from '@effectiv-crm/application';
import { Store } from '@ngrx/store';
import { RegisterContact, LoadContacts } from '../state/contacts.actions';
import { selectContacts, selectContactsLoading, selectContactsError } from '../state/contacts.selectors';

@Injectable()
export class ApiContactsFacade implements ContactsFacade {

  private store = inject(Store);

  contacts: Signal<ContactReadModel[]> = this.store.selectSignal(selectContacts);
  loading: Signal<boolean> = this.store.selectSignal(selectContactsLoading);
  error: Signal<string> = this.store.selectSignal(selectContactsError);

  loadContacts(): void {
    this.store.dispatch(LoadContacts());
  }

  registerContact(contact: RegisterContactDto): void {
    this.store.dispatch(RegisterContact({ contact }));
  }

}
