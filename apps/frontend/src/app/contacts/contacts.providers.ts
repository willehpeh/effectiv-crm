import { ContactsFacade } from './facades/contacts.facade';
import { ApiContactsFacade } from './facades/api.contacts.facade';
import { provideState } from '@ngrx/store';
import { contactsFeatureKey, contactsReducer } from './state/contacts.reducer';
import { provideEffects } from '@ngrx/effects';
import { ContactsEffects } from './state/contacts.effects';
import { ContactsApiService } from './services/contacts-api.service';

export const contactsProviders = [
  {
    provide: ContactsFacade,
    useClass: ApiContactsFacade
  },
  ContactsApiService,
  provideState({
    name: contactsFeatureKey,
    reducer: contactsReducer
  }),
  provideEffects([ContactsEffects])
];
