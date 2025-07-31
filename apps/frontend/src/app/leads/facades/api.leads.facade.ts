import { inject, Injectable } from '@angular/core';
import { LeadsFacade } from './leads.facade';
import { CaptureLeadDto } from '@effectiv-crm/application';
import { Store } from '@ngrx/store';
import { CaptureLead } from '../state/leads.actions';

@Injectable()
export class ApiLeadsFacade implements LeadsFacade {

  private store = inject(Store);

  captureLead(lead: CaptureLeadDto): void {
    this.store.dispatch(CaptureLead({ lead }));
  }

}
