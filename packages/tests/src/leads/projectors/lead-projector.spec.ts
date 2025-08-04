import { LeadCapturedEvent } from '@effectiv-crm/domain';
import { LeadProjector } from '@effectiv-crm/application';
import { FakeContactProjection } from '../../contacts/projections/fakes/fake-contact-projection';
import { FakeLeadsProjection } from '../projections/fakes/fake-leads-projection';

describe('LeadProjector', () => {
  let leadsProjection: FakeLeadsProjection;
  let contactProjection: FakeContactProjection;
  let leadProjector: LeadProjector;

  beforeEach(() => {
    leadsProjection = new FakeLeadsProjection();
    contactProjection = new FakeContactProjection();
    leadProjector = new LeadProjector(leadsProjection, contactProjection);
  });

  describe('when LeadCaptured event is handled', () => {
    it('creates a complete lead record by reading contact info and combining with lead details', async () => {
      const contactId = 'contact-123';
      const leadId = 'lead-456';
      
      // Set up contact in contact projection
      contactProjection.addContact({
        id: contactId,
        name: 'John Doe',
        email: 'john.doe@example.com'
      });

      const leadCapturedEvent = new LeadCapturedEvent(leadId, {
        contactId,
        source: 'website',
        contactDate: '2024-01-15T10:00:00Z',
        details: 'Interested in premium package'
      });

      await leadProjector.handleLeadCaptured(leadCapturedEvent);

      const savedLeads = leadsProjection.getSavedLeads();
      expect(savedLeads).toHaveLength(1);
      expect(savedLeads[0]).toEqual({
        id: leadId,
        contactId: contactId,
        contactName: 'John Doe',
        contactEmail: 'john.doe@example.com',
        source: 'website',
        capturedAt: '2024-01-15T10:00:00Z'
      });
    });

    it('throws error if contact is not found', async () => {
      const contactId = 'nonexistent-contact';
      const leadId = 'lead-456';

      const leadCapturedEvent = new LeadCapturedEvent(leadId, {
        contactId,
        source: 'website',
        contactDate: '2024-01-15T10:00:00Z',
        details: 'Interested in premium package'
      });

      await expect(leadProjector.handleLeadCaptured(leadCapturedEvent))
        .rejects.toThrow(`Contact with id ${contactId} not found`);

      const savedLeads = leadsProjection.getSavedLeads();
      expect(savedLeads).toHaveLength(0);
    });
  });
});
