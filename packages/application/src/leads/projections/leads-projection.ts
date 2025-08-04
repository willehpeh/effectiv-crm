import { LeadReadModel } from '../read-models/lead-read-model';

export interface LeadsProjection {
  getAllLeads(): LeadReadModel[];
  addLead(lead: LeadReadModel): void;
}
