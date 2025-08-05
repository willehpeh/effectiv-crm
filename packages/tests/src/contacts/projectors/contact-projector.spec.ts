import { ContactProjector } from '@effectiv-crm/application';
import { ContactRegisteredEvent } from '@effectiv-crm/domain';
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
});
