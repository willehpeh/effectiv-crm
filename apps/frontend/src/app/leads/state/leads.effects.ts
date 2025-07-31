import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CaptureLead, CaptureLeadFailure, CaptureLeadSuccess } from './leads.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LeadsApiService } from '../services/leads-api.service';
import { Router } from '@angular/router';

@Injectable()
export class LeadsEffects {
  private actions$ = inject(Actions);
  private leadsApi = inject(LeadsApiService);
  private router = inject(Router);

  captureLead$ = createEffect(() => this.actions$.pipe(
    ofType(CaptureLead),
    switchMap(({ lead }) => this.leadsApi.captureLead(lead).pipe(
      map(() => CaptureLeadSuccess()),
      catchError(error => of(CaptureLeadFailure({ error })))
    ))
  ));

  redirectToLeads$ = createEffect(() => this.actions$.pipe(
    ofType(CaptureLeadSuccess),
    tap(() => this.router.navigate(['/leads']))
  ), { dispatch: false });
}
