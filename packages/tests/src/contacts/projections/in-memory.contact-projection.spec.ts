import { InMemoryContactProjection } from '@effectiv-crm/infrastructure';
import { ProjectionEventStream } from '@effectiv-crm/infrastructure';
import { ContactRegisteredEvent, MessageSentToContactEvent, DomainEvent } from '@effectiv-crm/domain';
import { Subject } from 'rxjs';

describe('InMemoryContactProjection', () => {
  let projection: InMemoryContactProjection;
  let eventStream: Subject<DomainEvent>;
  let mockProjectionEventStream: jest.Mocked<ProjectionEventStream>;

  beforeEach(() => {
    eventStream = new Subject();
    mockProjectionEventStream = {
      stream$: () => eventStream.asObservable()
    } as jest.Mocked<ProjectionEventStream>;

    projection = new InMemoryContactProjection(mockProjectionEventStream);
  });

  describe('when a MessageSentToContact event is published', () => {
    it('should update the lastContacted field with the message sent date', () => {
      // Arrange - Register a contact first
      const contactRegisteredEvent = new ContactRegisteredEvent(
        'contact-123', 
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          company: 'Test Company'
        }
      );
      eventStream.next(contactRegisteredEvent);

      // Verify contact exists without lastContacted
      let contact = projection.contactById('contact-123');
      expect(contact).toBeDefined();
      expect(contact?.lastContacted).toBeUndefined();

      // Act - Send a message to the contact
      const sentDate = new Date('2024-01-15T10:30:00Z');
      const messageSentEvent = new MessageSentToContactEvent(
        'contact-123',
        2,
        {
          subject: 'Test message',
          body: 'Test body',
          sentAt: sentDate,
          messageChannel: 'email',
          notes: 'Test notes'
        }
      );
      eventStream.next(messageSentEvent);

      // Assert
      contact = projection.contactById('contact-123');
      expect(contact?.lastContacted).toBe(sentDate.toISOString());
    });

    it('should update lastContacted to the most recent message date', () => {
      // Arrange - Register a contact
      const contactRegisteredEvent = new ContactRegisteredEvent(
        'contact-456', 
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com'
        }
      );
      eventStream.next(contactRegisteredEvent);

      // Send first message
      const firstMessageDate = new Date('2024-01-10T09:00:00Z');
      const firstMessageEvent = new MessageSentToContactEvent(
        'contact-456',
        2,
        {
          subject: 'First message',
          sentAt: firstMessageDate,
          messageChannel: 'phone'
        }
      );
      eventStream.next(firstMessageEvent);

      // Send second message with later date
      const secondMessageDate = new Date('2024-01-20T14:00:00Z');
      const secondMessageEvent = new MessageSentToContactEvent(
        'contact-456',
        3,
        {
          subject: 'Second message',
          sentAt: secondMessageDate,
          messageChannel: 'email'
        }
      );
      eventStream.next(secondMessageEvent);

      // Assert - should have the most recent date
      const contact = projection.contactById('contact-456');
      expect(contact?.lastContacted).toBe(secondMessageDate.toISOString());
    });
  });
});
