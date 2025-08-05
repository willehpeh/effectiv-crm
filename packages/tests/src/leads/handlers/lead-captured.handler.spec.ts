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

      await leadCapturedHandler.handle(leadEvents.lead456Captured());

      expect(leadsProjection.savedLeads()).toEqual([expectedLeadProjections.lead456]);
    });

    it('throws error if contact is not found', async () => {
      await expect(leadCapturedHandler.handle(leadEvents.nonexistentContactLead()))
        .rejects.toThrow(`Contact with id ${leadTestData.nonexistentContactId} not found`);

      expect(leadsProjection.savedLeads()).toHaveLength(0);
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
      expect(leadsProjection.savedLeads()).toEqual([expectedLeadProjections.lead1, expectedLeadProjections.lead2]);
    });
  });
});
