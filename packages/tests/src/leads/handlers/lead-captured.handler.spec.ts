import { LeadCapturedEvent, DomainEvent } from '@effectiv-crm/domain';
import { LeadCapturedHandler } from '@effectiv-crm/application';
import { FakeContactProjection } from '../../contacts/projections/fakes/fake-contact-projection';
import { FakeLeadsProjection } from '../projections/fakes/fake-leads-projection';

describe('LeadCapturedHandler', () => {
  let leadsProjection: FakeLeadsProjection;
  let contactProjection: FakeContactProjection;
  let leadCapturedHandler: LeadCapturedHandler;

  beforeEach(() => {
    leadsProjection = new FakeLeadsProjection();
    contactProjection = new FakeContactProjection();
    leadCapturedHandler = new LeadCapturedHandler(leadsProjection, contactProjection);
  });

  describe('handle', () => {
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

      await leadCapturedHandler.handle(leadCapturedEvent);

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

      await expect(leadCapturedHandler.handle(leadCapturedEvent))
        .rejects.toThrow(`Contact with id ${contactId} not found`);

      const savedLeads = leadsProjection.getSavedLeads();
      expect(savedLeads).toHaveLength(0);
    });
  });

  describe('rebuild', () => {
    it('should rebuild from all LeadCaptured events', async () => {
      // Arrange
      contactProjection.addContact({
        id: 'contact-1',
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
      contactProjection.addContact({
        id: 'contact-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      });

      const events: DomainEvent[] = [
        new LeadCapturedEvent('lead-1', {
          contactId: 'contact-1',
          source: 'website',
          contactDate: '2024-01-15T10:00:00Z',
          details: 'First lead'
        }),
        new LeadCapturedEvent('lead-2', {
          contactId: 'contact-2',
          source: 'referral',
          contactDate: '2024-01-16T11:00:00Z',
          details: 'Second lead'
        }),
        // Non-LeadCaptured event should be ignored
        {
          aggregateId: 'contact-1',
          aggregateVersion: 1,
          eventType: 'ContactRegistered',
          aggregateType: 'Contact',
          occurredOn: new Date().toISOString(),
          payload: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }
        }
      ];

      // Act
      await leadCapturedHandler.rebuild(events);

      // Assert
      const savedLeads = leadsProjection.getSavedLeads();
      expect(savedLeads).toHaveLength(2);
      expect(savedLeads[0]).toEqual({
        id: 'lead-1',
        contactId: 'contact-1',
        contactName: 'John Doe',
        contactEmail: 'john.doe@example.com',
        source: 'website',
        capturedAt: '2024-01-15T10:00:00Z'
      });
      expect(savedLeads[1]).toEqual({
        id: 'lead-2',
        contactId: 'contact-2',
        contactName: 'Jane Smith',
        contactEmail: 'jane.smith@example.com',
        source: 'referral',
        capturedAt: '2024-01-16T11:00:00Z'
      });
    });
  });
});
