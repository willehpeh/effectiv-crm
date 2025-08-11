import { FakeEventStore } from '../../../common/fixtures/fake.event-store';
import { RecordEmailSentToContactCommand, RecordEmailSentToContactCommandHandler } from '@effectiv-crm/application';
import { FakeEventPublisher } from '../../../common/fixtures/fake-event-publisher';
import { ContactRegisteredEvent } from '@effectiv-crm/domain';

describe('Record Email Sent To Contact', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it('saves an EmailSentToContact event to the event store', async () => {
    const contactId = 'contact-123';
    
    // Stub the event store to return a ContactRegistered event
    const contactRegisteredEvent = new ContactRegisteredEvent(contactId, {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Example Corp'
    });
    
    jest.spyOn(eventStore, 'eventsForAggregate').mockResolvedValue([contactRegisteredEvent]);

    // Record an email sent to that contact
    const command = new RecordEmailSentToContactCommand({
      contactId: contactId,
      subject: 'Follow up meeting',
      body: 'Thanks for the great meeting today.',
      sentAt: new Date('2024-01-15T10:30:00Z'),
      senderEmail: 'user@example.com',
      notes: 'Follow up on project discussion'
    });
    const handler = new RecordEmailSentToContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    expect(eventStore.events).toEqual([
      expect.objectContaining({
        aggregateId: contactId,
        aggregateVersion: 2,
        eventType: 'EmailSentToContact',
        aggregateType: 'Contact',
        occurredOn: expect.any(String),
        payload: {
          subject: 'Follow up meeting',
          body: 'Thanks for the great meeting today.',
          sentAt: new Date('2024-01-15T10:30:00Z'),
          senderEmail: 'user@example.com',
          notes: 'Follow up on project discussion'
        }
      })
    ]);
  });
});
