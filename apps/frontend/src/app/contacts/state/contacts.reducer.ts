import { createReducer, on } from '@ngrx/store';
import { RegisterContact, RegisterContactFailure, RegisterContactSuccess } from './contacts.actions';

export const contactsFeatureKey = 'contacts';

export interface ContactsState {
  loading: boolean;
  errorMessage: string;
}

export const initialState: ContactsState = {
  loading: false,
  errorMessage: ''
};

export const contactsReducer = createReducer(
  initialState,
  on(RegisterContact, state => ({
    ...state,
    loading: true
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
);
