import { LeadReadModel } from '../read-models/lead.read-model';

export abstract class LeadProjection {
  abstract getAllLeads(): LeadReadModel[];
  abstract addLead(lead: LeadReadModel): void;
}
