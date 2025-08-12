import { createReducer, on } from '@ngrx/store';
import { 
  RegisterContact, 
  RegisterContactFailure, 
  RegisterContactSuccess, 
  LoadContacts, 
  LoadContactsSuccess, 
  LoadContactsFailure,
  RecordMessageSent,
  RecordMessageSentSuccess,
  RecordMessageSentFailure 
} from './contacts.actions';
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
  on(RecordMessageSent, (state, action) => ({
    ...state,
    contacts: state.contacts.map(contact =>
      contact.id === action.contactId
        ? { ...contact, lastContacted: action.sentAt }
        : contact
    ),
    errorMessage: ''
  })),
  on(RecordMessageSentSuccess, state => ({
    ...state,
    // Optimistic update already applied, no changes needed
  })),
  on(RecordMessageSentFailure, (state, action) => ({
    ...state,
    errorMessage: action.error,
    // Note: In a real app, you might want to revert the optimistic update here
    // by re-loading contacts or storing the previous state
  })),
);
