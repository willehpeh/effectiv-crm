import { LeadsFacade } from './facades/leads.facade';
import { ApiLeadsFacade } from './facades/api.leads.facade';

export const leadsProviders = [
  {
    provide: LeadsFacade,
    useClass: ApiLeadsFacade
  }
];
