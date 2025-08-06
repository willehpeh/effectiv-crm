import { LeadProjection } from '@effectiv-crm/application';
import { LeadReadModel } from '@effectiv-crm/application';

export class FakeLeadsProjection implements LeadProjection {
  private leads: LeadReadModel[] = [];

  allLeads(): LeadReadModel[] {
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
