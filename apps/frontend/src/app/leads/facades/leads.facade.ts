import { CaptureLeadDto } from '@effectiv-crm/application';

export abstract class LeadsFacade {
  abstract saveNewLead(leadDto: CaptureLeadDto): void;
}
