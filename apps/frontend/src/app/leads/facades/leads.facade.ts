import { NewLead } from '../types/new-lead';

export abstract class LeadsFacade {
  abstract saveNewLead(newLead: NewLead): void;
}
