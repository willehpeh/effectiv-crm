import { inject, Injectable } from '@angular/core';
import { ContactsFacade } from './contacts.facade';
import { RegisterContactDto } from '@effectiv-crm/application';
import { Store } from '@ngrx/store';
import { RegisterContact } from '../state/contacts.actions';

@Injectable()
export class ApiContactsFacade implements ContactsFacade {

  private store = inject(Store);

  registerContact(contact: RegisterContactDto): void {
    this.store.dispatch(RegisterContact({ contact }));
  }

}
