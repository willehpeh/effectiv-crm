import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ContactsApiService } from '../services/contacts-api.service';
import { Router } from '@angular/router';

@Injectable()
export class ContactsEffects {
  private actions$ = inject(Actions);
  private contactsApi = inject(ContactsApiService);
  private router = inject(Router);

  registerContact$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterContact),
    switchMap(({ contact }) => this.contactsApi.registerContact(contact).pipe(
      map(() => RegisterContactSuccess()),
      catchError(error => of(RegisterContactFailure({ error })))
    ))
  ));

  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(LoadContacts),
    switchMap(() => this.contactsApi.loadContacts().pipe(
      map(contacts => LoadContactsSuccess({ contacts })),
      catchError(error => of(LoadContactsFailure({ error: error.message })))
    ))
  ));

  recordMessageSent$ = createEffect(() => this.actions$.pipe(
    ofType(RecordMessageSent),
    switchMap(({ contactId, subject, body, messageChannel, notes, sentAt }) => 
      this.contactsApi.recordMessageSent({ contactId, subject, body, messageChannel, notes, sentAt }).pipe(
        map(() => RecordMessageSentSuccess({ contactId, sentAt })),
        catchError(error => of(RecordMessageSentFailure({ error: error.message })))
      )
    )
  ));

  redirectToContacts$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterContactSuccess),
    tap(() => this.router.navigate(['/contacts']))
  ), { dispatch: false });
}
