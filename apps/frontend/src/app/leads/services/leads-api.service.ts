import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaptureLeadDto } from '@effectiv-crm/application';
import { Observable } from 'rxjs';

@Injectable()
export class LeadsApiService {
  private http = inject(HttpClient);

  captureLead(newLead: CaptureLeadDto): Observable<void> {
    return this.http.post<void>('/api/leads/capture', newLead);
  }
}
