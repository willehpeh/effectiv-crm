import { inject, Injectable } from '@angular/core';
import { LeadsFacade } from './leads.facade';
import { HttpClient } from '@angular/common/http';
import { CaptureLeadDto } from '@effectiv-crm/application';

@Injectable()
export class ApiLeadsFacade implements LeadsFacade {

  private http = inject(HttpClient);

  saveNewLead(newLead: CaptureLeadDto): void {
    this.http.post('/api/leads/capture', newLead).subscribe();
  }

}
