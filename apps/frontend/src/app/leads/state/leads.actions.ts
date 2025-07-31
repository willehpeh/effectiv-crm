import { createAction, props } from '@ngrx/store';
import { CaptureLeadDto } from '@effectiv-crm/application';

export const CaptureLead = createAction(
  '[LeadsFacade] Capture Lead',
  props<{ lead: CaptureLeadDto }>()
);

export const CaptureLeadSuccess = createAction(
  '[Leads API] Capture Lead Success'
);

export const CaptureLeadFailure = createAction(
  '[Leads API] Capture Lead Failure',
  props<{ error: string }>()
);
