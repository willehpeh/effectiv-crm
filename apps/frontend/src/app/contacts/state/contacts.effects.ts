import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegisterContact, RegisterContactFailure, RegisterContactSuccess } from './contacts.actions';
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

  redirectToContacts$ = createEffect(() => this.actions$.pipe(
    ofType(RegisterContactSuccess),
    tap(() => this.router.navigate(['/contacts']))
  ), { dispatch: false });
}
