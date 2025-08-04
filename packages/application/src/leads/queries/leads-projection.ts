import { LeadReadModel } from './lead-read-model';

export interface LeadsProjection {
  getAllLeads(): Promise<LeadReadModel[]>;
}
