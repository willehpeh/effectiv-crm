import { LeadCapturedEvent } from '@effectiv-crm/domain';
import { LeadReadModel } from '../queries/lead-read-model';
import { ContactRepository } from '../../contacts';
import { LeadRepository } from '../repositories/lead-repository';

export class LeadProjector {
  constructor(
    private readonly leadRepository: LeadRepository,
    private readonly contactRepository: ContactRepository
  ) {}

  async handleLeadCaptured(event: LeadCapturedEvent): Promise<void> {
    const contact = await this.contactRepository.getContactById(event.payload.contactId);

    if (contact) {
      const completeLead: LeadReadModel = {
        id: event.aggregateId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        company: contact.company,
        status: 'new',
        lastContacted: event.payload.contactDate,
        details: event.payload.details
      };

      await this.leadRepository.save(completeLead);
    }
  }
}
