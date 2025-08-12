import { createAction, props } from '@ngrx/store';
import { RegisterContactDto, ContactReadModel } from '@effectiv-crm/application';

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

export const LoadContacts = createAction(
  '[ContactsFacade] Load Contacts'
);

export const LoadContactsSuccess = createAction(
  '[Contacts API] Load Contacts Success',
  props<{ contacts: ContactReadModel[] }>()
);

export const LoadContactsFailure = createAction(
  '[Contacts API] Load Contacts Failure',
  props<{ error: string }>()
);

export const RecordMessageSent = createAction(
  '[ContactsFacade] Record Message Sent',
  props<{ contactId: string; messageChannel: string; messageContent?: string; sentAt: string }>()
);

export const RecordMessageSentSuccess = createAction(
  '[Contacts API] Record Message Sent Success',
  props<{ contactId: string; sentAt: string }>()
);

export const RecordMessageSentFailure = createAction(
  '[Contacts API] Record Message Sent Failure',
  props<{ error: string }>()
);
