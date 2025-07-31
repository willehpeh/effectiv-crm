import { LeadsFacade } from './facades/leads.facade';
import { ApiLeadsFacade } from './facades/api.leads.facade';
import { provideState } from '@ngrx/store';
import { leadsFeatureKey, leadsReducer } from './state/leads.reducer';
import { provideEffects } from '@ngrx/effects';
import { LeadsEffects } from './state/leads.effects';
import { LeadsApiService } from './services/leads-api.service';

export const leadsProviders = [
  {
    provide: LeadsFacade,
    useClass: ApiLeadsFacade
  },
  LeadsApiService,
  provideState({
    name: leadsFeatureKey,
    reducer: leadsReducer
  }),
  provideEffects([LeadsEffects])
];
