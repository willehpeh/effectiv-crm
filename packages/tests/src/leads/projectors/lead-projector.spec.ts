import { LeadCapturedEvent } from '@effectiv-crm/domain';
import { LeadProjector } from '@effectiv-crm/application';
import { FakeContactRepository } from '../../contacts/repositories/fakes/fake-contact-repository';
import { FakeLeadRepository } from '../repositories/fakes/fake-lead-repository';

describe('LeadProjector', () => {
  let leadRepository: FakeLeadRepository;
  let contactRepository: FakeContactRepository;
  let leadProjector: LeadProjector;

  beforeEach(() => {
    leadRepository = new FakeLeadRepository();
    contactRepository = new FakeContactRepository();
    leadProjector = new LeadProjector(leadRepository, contactRepository);
  });

  describe('when LeadCaptured event is handled', () => {
    it('creates a complete lead record by reading contact info and combining with lead details', async () => {
      const contactId = 'contact-123';
      const leadId = 'lead-456';
      
      // Set up contact in contact repository
      contactRepository.addContact({
        id: contactId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        company: 'ACME Corp'
      });

      const leadCapturedEvent = new LeadCapturedEvent(leadId, {
        contactId,
        source: 'website',
        contactDate: '2024-01-15T10:00:00Z',
        details: 'Interested in premium package',
        referrer: 'Jane Smith'
      });

      await leadProjector.handleLeadCaptured(leadCapturedEvent);

      const savedLeads = leadRepository.getSavedLeads();
      expect(savedLeads).toHaveLength(1);
      expect(savedLeads[0]).toEqual({
        id: leadId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        company: 'ACME Corp',
        status: 'new',
        lastContacted: '2024-01-15T10:00:00Z',
        details: 'Interested in premium package'
      });
    });

    it('does not create lead if contact is not found', async () => {
      const contactId = 'nonexistent-contact';
      const leadId = 'lead-456';

      const leadCapturedEvent = new LeadCapturedEvent(leadId, {
        contactId,
        source: 'website',
        contactDate: '2024-01-15T10:00:00Z',
        details: 'Interested in premium package'
      });

      await leadProjector.handleLeadCaptured(leadCapturedEvent);

      const savedLeads = leadRepository.getSavedLeads();
      expect(savedLeads).toHaveLength(0);
    });
  });
});
