import { LeadReadModel } from '../queries/lead-read-model';

export interface LeadRepository {
  save(lead: LeadReadModel): Promise<void>;
  getAllLeads(): Promise<LeadReadModel[]>;
}
