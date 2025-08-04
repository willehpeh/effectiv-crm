import { LeadsProjection, LeadReadModel } from '@effectiv-crm/application';

export class FakeLeadsProjection implements LeadsProjection {
  private readonly leads: LeadReadModel[] = [];

  constructor(initialLeads: LeadReadModel[] = []) {
    this.leads = [...initialLeads];
  }

  async getAllLeads(): Promise<LeadReadModel[]> {
    return [...this.leads];
  }
}
