import { inject, Injectable, Signal } from '@angular/core';
import { ContactsFacade } from './contacts.facade';
import { RegisterContactDto, ContactReadModel } from '@effectiv-crm/application';
import { Store } from '@ngrx/store';
import { RegisterContact, LoadContacts, RecordMessageSent } from '../state/contacts.actions';
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

  recordMessageSent(contactId: string, subject: string, body?: string, messageChannel?: string, notes?: string, sentAt?: string): void {
    const timestamp = sentAt || new Date().toISOString();
    this.store.dispatch(RecordMessageSent({ 
      contactId, 
      subject,
      body,
      messageChannel: messageChannel || 'email',
      notes,
      sentAt: timestamp 
    }));
  }
}
