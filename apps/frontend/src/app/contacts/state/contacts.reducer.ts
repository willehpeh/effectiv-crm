import { createReducer, on } from '@ngrx/store';
import { RegisterContact, RegisterContactFailure, RegisterContactSuccess, LoadContacts, LoadContactsSuccess, LoadContactsFailure } from './contacts.actions';
import { ContactReadModel } from '@effectiv-crm/application';

export const contactsFeatureKey = 'contacts';

export interface ContactsState {
  contacts: ContactReadModel[];
  loading: boolean;
  errorMessage: string;
}

export const initialState: ContactsState = {
  contacts: [],
  loading: false,
  errorMessage: ''
};

export const contactsReducer = createReducer(
  initialState,
  on(RegisterContact, state => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(RegisterContactSuccess, state => ({
    ...state,
    loading: false
  })),
  on(RegisterContactFailure, (state, action) => ({
    ...state,
    loading: false,
    errorMessage: action.error
  })),
  on(LoadContacts, state => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(LoadContactsSuccess, (state, action) => ({
    ...state,
    contacts: action.contacts,
    loading: false
  })),
  on(LoadContactsFailure, (state, action) => ({
    ...state,
    loading: false,
    errorMessage: action.error
  })),
);
