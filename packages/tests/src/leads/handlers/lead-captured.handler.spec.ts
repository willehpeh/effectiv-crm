import { DomainEvent } from '@effectiv-crm/domain';
import { LeadCapturedHandler } from '@effectiv-crm/application';
import { FakeContactProjection } from '../../contacts/fixtures/fake-contact-projection';
import { FakeLeadsProjection } from '../fixtures/fake-leads-projection';
import { expectedLeadProjections, leadEvents, leadTestData } from '../fixtures/lead-test-data';

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
      // Set up contact in contact projection
      contactProjection.addContact(leadTestData.contacts.johnDoe);

      const leadCapturedEvent = leadEvents.lead456Captured();

      await leadCapturedHandler.handle(leadCapturedEvent);

      const savedLeads = leadsProjection.getSavedLeads();
      expect(savedLeads).toHaveLength(1);
      expect(savedLeads[0]).toEqual(expectedLeadProjections.lead456);
    });

    it('throws error if contact is not found', async () => {
      const leadCapturedEvent = leadEvents.nonexistentContactLead();

      await expect(leadCapturedHandler.handle(leadCapturedEvent))
        .rejects.toThrow(`Contact with id ${leadTestData.nonexistentContactId} not found`);

      const savedLeads = leadsProjection.getSavedLeads();
      expect(savedLeads).toHaveLength(0);
    });
  });

  describe('rebuild', () => {
    it('should rebuild from all LeadCaptured events', async () => {
      // Arrange
      contactProjection.addContact(leadTestData.contacts.contact1);
      contactProjection.addContact(leadTestData.contacts.contact2);

      const events: DomainEvent[] = [
        leadEvents.lead1Captured(),
        leadEvents.lead2Captured(),
        // Non-LeadCaptured event should be ignored
        leadEvents.nonLeadEvent()
      ];

      // Act
      await leadCapturedHandler.rebuild(events);

      // Assert
      const savedLeads = leadsProjection.getSavedLeads();
      expect(savedLeads).toHaveLength(2);
      expect(savedLeads[0]).toEqual(expectedLeadProjections.lead1);
      expect(savedLeads[1]).toEqual(expectedLeadProjections.lead2);
    });
  });
});
