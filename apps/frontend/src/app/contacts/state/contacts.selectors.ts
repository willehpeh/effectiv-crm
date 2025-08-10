import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactsState, contactsFeatureKey } from './contacts.reducer';

export const selectContactsState = createFeatureSelector<ContactsState>(contactsFeatureKey);

export const selectContacts = createSelector(
  selectContactsState,
  (state: ContactsState) => state.contacts
);

export const selectContactsLoading = createSelector(
  selectContactsState,
  (state: ContactsState) => state.loading
);

export const selectContactsError = createSelector(
  selectContactsState,
  (state: ContactsState) => state.errorMessage
);
