import { Injectable } from '@nestjs/common';
import { LeadProjection, LeadReadModel } from '@effectiv-crm/application';

@Injectable()
export class InMemoryLeadsProjection implements LeadProjection {
  private readonly leads = new Map<string, LeadReadModel>();

  allLeads(): LeadReadModel[] {
    return Array.from(this.leads.values());
  }

  addLead(lead: LeadReadModel): void {
    this.leads.set(lead.id, lead);
  }
}
