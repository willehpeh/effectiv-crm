import { ContactRegisteredHandler } from '@effectiv-crm/application';
import { DomainEvent } from '@effectiv-crm/domain';
import { FakeContactProjection } from '../fixtures/fake-contact-projection';
import { contactEvents, contactTestData, expectedContactProjections } from '../fixtures/contact-test-data';

describe('ContactRegisteredHandler', () => {
  let contactRegisteredHandler: ContactRegisteredHandler;
  let fakeContactProjection: FakeContactProjection;

  beforeEach(() => {
    fakeContactProjection = new FakeContactProjection();
    contactRegisteredHandler = new ContactRegisteredHandler(fakeContactProjection);
  });

  describe('handle', () => {
    it('should add contact to projection when ContactRegisteredEvent is handled', () => {
      // Act
      contactRegisteredHandler.handle(contactEvents.johnDoeRegistered());

      // Assert
      const savedContact = fakeContactProjection.getContactById(contactTestData.johnDoe.id);
      expect(savedContact).toEqual(expectedContactProjections.johnDoe);
    });
  });

  describe('rebuild', () => {
    it('should rebuild from all ContactRegistered events', () => {
      // Arrange
      fakeContactProjection.addContact(contactTestData.existingContact);

      const events: DomainEvent[] = [
        contactEvents.janeDoeRegistered(),
        contactEvents.janeSmithRegistered(),
        // Non-ContactRegistered event should be ignored
        contactEvents.nonContactEvent()
      ];

      // Act
      contactRegisteredHandler.rebuild(events);

      // Assert - existing data should remain (handler doesn't clear)
      expect(fakeContactProjection.getContactById(contactTestData.existingContact.id)).toBeDefined();
      expect(fakeContactProjection.getContactById(contactTestData.janeDoe.id)).toEqual(expectedContactProjections.janeDoe);
      expect(fakeContactProjection.getContactById(contactTestData.janeSmith.id)).toEqual(expectedContactProjections.janeSmith);
    });
  });
});
