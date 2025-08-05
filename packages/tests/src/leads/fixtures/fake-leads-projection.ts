import { LeadsProjection } from '@effectiv-crm/application';
import { LeadReadModel } from '@effectiv-crm/application';

export class FakeLeadsProjection implements LeadsProjection {
  private leads: LeadReadModel[] = [];

  getAllLeads(): LeadReadModel[] {
    return [...this.leads];
  }

  addLead(lead: LeadReadModel): void {
    this.leads.push(lead);
  }

  savedLeads(): LeadReadModel[] {
    return [...this.leads];
  }

  clear(): void {
    this.leads = [];
  }
}
