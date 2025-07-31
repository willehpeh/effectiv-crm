import { LeadsFacade } from './leads.facade';
import { CaptureLeadDto } from '@effectiv-crm/application';

export class InMemoryLeadsFacade implements LeadsFacade {
  saveNewLead(newLead: CaptureLeadDto): void {
    const currentNewLeads = JSON.parse(localStorage.getItem('newLeads') || '[]');
    currentNewLeads.push(newLead);
    localStorage.setItem('newLeads', JSON.stringify(currentNewLeads));
  }
}
