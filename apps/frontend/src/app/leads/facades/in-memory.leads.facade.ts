import { LeadsFacade } from './leads.facade';
import { NewLead } from '../types/new-lead';

export class InMemoryLeadsFacade implements LeadsFacade {
  saveNewLead(newLead: NewLead): void {
    const currentNewLeads = JSON.parse(localStorage.getItem('newLeads') || '[]');
    currentNewLeads.push(newLead);
    localStorage.setItem('newLeads', JSON.stringify(currentNewLeads));
  }
}
