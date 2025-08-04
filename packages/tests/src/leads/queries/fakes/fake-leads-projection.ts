import { LeadsProjection, LeadReadModel } from '@effectiv-crm/application';

export class FakeLeadsProjection implements LeadsProjection {
  private leads: LeadReadModel[] = [];

  constructor(initialLeads: LeadReadModel[] = []) {
    this.leads = [...initialLeads];
  }

  async getAllLeads(): Promise<LeadReadModel[]> {
    return [...this.leads];
  }

  addLead(lead: LeadReadModel): void {
    this.leads.push(lead);
  }

  clear(): void {
    this.leads = [];
  }
}
