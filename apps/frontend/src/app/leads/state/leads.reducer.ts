import { createReducer, on } from '@ngrx/store';
import { CaptureLead, CaptureLeadFailure, CaptureLeadSuccess } from './leads.actions';

export const leadsFeatureKey = 'leads';

export interface LeadsState {
  loading: boolean;
  errorMessage: string;
}

export const initialState: LeadsState = {
  loading: false,
  errorMessage: ''
};

export const leadsReducer = createReducer(
  initialState,
  on(CaptureLead, state => ({
    ...state,
    loading: true
  })),
  on(CaptureLeadSuccess, state => ({
    ...state,
    loading: false
  })),
  on(CaptureLeadFailure, (state, action) => ({
    ...state,
    loading: false,
    errorMessage: action.error
  })),
);
