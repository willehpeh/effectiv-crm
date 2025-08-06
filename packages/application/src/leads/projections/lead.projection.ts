import { LeadReadModel } from '../read-models/lead.read-model';

export abstract class LeadProjection {
  abstract allLeads(): LeadReadModel[];
}
