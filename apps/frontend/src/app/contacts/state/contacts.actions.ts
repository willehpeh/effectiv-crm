import { createAction, props } from '@ngrx/store';
import { RegisterContactDto } from '@effectiv-crm/application';

export const RegisterContact = createAction(
  '[ContactsFacade] Register Contact',
  props<{ contact: RegisterContactDto }>()
);

export const RegisterContactSuccess = createAction(
  '[Contacts API] Register Contact Success'
);

export const RegisterContactFailure = createAction(
  '[Contacts API] Register Contact Failure',
  props<{ error: string }>()
);
