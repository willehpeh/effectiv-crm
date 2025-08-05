import { Injectable } from '@nestjs/common';
import { LeadsProjection, LeadReadModel } from '@effectiv-crm/application';

@Injectable()
export class InMemoryLeadsProjection implements LeadsProjection {
  private readonly leads = new Map<string, LeadReadModel>();

  getAllLeads(): LeadReadModel[] {
    return Array.from(this.leads.values());
  }

  addLead(lead: LeadReadModel): void {
    this.leads.set(lead.id, lead);
  }
}
