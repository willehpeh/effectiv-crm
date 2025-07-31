import { CaptureLeadDto } from '@effectiv-crm/application';

export abstract class LeadsFacade {
  abstract captureLead(leadDto: CaptureLeadDto): void;
}
