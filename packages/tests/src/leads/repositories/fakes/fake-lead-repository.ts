import { LeadRepository, LeadReadModel } from '@effectiv-crm/application';

export class FakeLeadRepository implements LeadRepository {
  private readonly savedLeads: LeadReadModel[] = [];

  constructor(initialLeads: LeadReadModel[] = []) {
    this.savedLeads.push(...initialLeads);
  }

  async save(lead: LeadReadModel): Promise<void> {
    this.savedLeads.push(lead);
  }

  async getAllLeads(): Promise<LeadReadModel[]> {
    return [...this.savedLeads];
  }

  getSavedLeads(): LeadReadModel[] {
    return [...this.savedLeads];
  }
}
