import { LeadReadModel } from '../read-models/lead-read-model';

export abstract class LeadsProjection {
  abstract getAllLeads(): LeadReadModel[];
  abstract addLead(lead: LeadReadModel): void;
}
