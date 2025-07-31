import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CaptureLead, CaptureLeadFailure, CaptureLeadSuccess } from './leads.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { LeadsApiService } from '../services/leads-api.service';

@Injectable()
export class LeadsEffects {
  private actions$ = inject(Actions);
  private leadsApi = inject(LeadsApiService);

  captureLead$ = createEffect(() => this.actions$.pipe(
    ofType(CaptureLead),
    switchMap(({ lead }) => this.leadsApi.captureLead(lead).pipe(
      map(() => CaptureLeadSuccess()),
      catchError(error => of(CaptureLeadFailure({ error })))
    ))
  ));
}
