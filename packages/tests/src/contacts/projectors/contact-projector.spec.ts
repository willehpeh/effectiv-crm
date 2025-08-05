import { ContactProjector } from '@effectiv-crm/application';
import { ContactRegisteredEvent, DomainEvent } from '@effectiv-crm/domain';
import { FakeContactProjection } from '../projections/fakes/fake-contact-projection';

describe('ContactProjector', () => {
  let contactProjector: ContactProjector;
  let fakeContactProjection: FakeContactProjection;

  beforeEach(() => {
    fakeContactProjection = new FakeContactProjection();
    contactProjector = new ContactProjector(fakeContactProjection);
  });

  describe('handleContactRegistered', () => {
    it('should add contact to projection when ContactRegisteredEvent is handled', () => {
      // Arrange
      const contactRegisteredEvent = new ContactRegisteredEvent('contact-123', {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Corp'
      });

      // Act
      contactProjector.handleContactRegistered(contactRegisteredEvent);

      // Assert
      const savedContact = fakeContactProjection.getContactById('contact-123');
      expect(savedContact).toEqual({
        id: 'contact-123',
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
    });
  });

  describe('rebuild', () => {
    it('should clear projection and rebuild from all ContactRegistered events', async () => {
      // Arrange
      const existingContact = { id: 'existing-123', name: 'Existing Contact', email: 'existing@example.com' };
      fakeContactProjection.addContact(existingContact);

      const events: DomainEvent[] = [
        new ContactRegisteredEvent('contact-1', {
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          company: 'Acme Corp'
        }),
        new ContactRegisteredEvent('contact-2', {
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          company: 'Tech Inc'
        }),
        // Non-ContactRegistered event should be ignored
        {
          aggregateId: 'lead-1',
          aggregateVersion: 1,
          eventType: 'LeadCaptured',
          aggregateType: 'Lead',
          occurredOn: new Date().toISOString(),
          payload: { contactId: 'contact-1', source: 'Website' }
        }
      ];

      // Act
      await contactProjector.rebuild(events);

      // Assert
      expect(fakeContactProjection.getContactById('existing-123')).toBeUndefined();
      expect(fakeContactProjection.getContactById('contact-1')).toEqual({
        id: 'contact-1',
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
      expect(fakeContactProjection.getContactById('contact-2')).toEqual({
        id: 'contact-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      });
    });
  });
});
