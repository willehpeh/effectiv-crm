import { FakeEventStore } from '../../../common/fixtures/fake.event-store';
import { RecordMessageSentToContactCommand, RecordMessageSentToContactCommandHandler } from '@effectiv-crm/application';
import { FakeEventPublisher } from '../../../common/fixtures/fake-event-publisher';
import { ContactRegisteredEvent } from '@effectiv-crm/domain';

describe('Record Message Sent To Contact', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it('saves a MessageSentToContact event to the event store', async () => {
    const contactId = 'contact-123';
    
    // Stub the event store to return a ContactRegistered event
    const contactRegisteredEvent = new ContactRegisteredEvent(contactId, {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Example Corp'
    });
    
    jest.spyOn(eventStore, 'eventsForAggregate').mockResolvedValue([contactRegisteredEvent]);

    // Record a message sent to that contact
    const command = new RecordMessageSentToContactCommand({
      contactId: contactId,
      subject: 'Follow up meeting',
      body: 'Thanks for the great meeting today.',
      sentAt: '2024-01-15T10:30:00Z',
      messageChannel: 'email',
      notes: 'Follow up on project discussion'
    });
    const handler = new RecordMessageSentToContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    expect(eventStore.events).toEqual([
      expect.objectContaining({
        aggregateId: contactId,
        aggregateVersion: 2,
        eventType: 'MessageSentToContact',
        aggregateType: 'Contact',
        occurredOn: expect.any(String),
        payload: {
          subject: 'Follow up meeting',
          body: 'Thanks for the great meeting today.',
          sentAt: '2024-01-15T10:30:00Z',
          messageChannel: 'email',
          notes: 'Follow up on project discussion'
        }
      })
    ]);
  });

  it('publishes a MessageSentToContact event to the event stream', async () => {
    const contactId = 'contact-123';
    
    // Stub the event store to return a ContactRegistered event
    const contactRegisteredEvent = new ContactRegisteredEvent(contactId, {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Example Corp'
    });
    
    jest.spyOn(eventStore, 'eventsForAggregate').mockResolvedValue([contactRegisteredEvent]);

    // Record a message sent to that contact
    const command = new RecordMessageSentToContactCommand({
      contactId: contactId,
      subject: 'Follow up meeting',
      body: 'Thanks for the great meeting today.',
      sentAt: '2024-01-15T10:30:00Z',
      messageChannel: 'email',
      notes: 'Follow up on project discussion'
    });
    const handler = new RecordMessageSentToContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    expect(eventPublisher.publishedEvents).toHaveLength(1);
    expect(eventPublisher.publishedEvents[0]).toEqual(
      expect.objectContaining({
        aggregateId: contactId,
        aggregateVersion: 2,
        eventType: 'MessageSentToContact',
        aggregateType: 'Contact',
        occurredOn: expect.any(String),
        payload: {
          subject: 'Follow up meeting',
          body: 'Thanks for the great meeting today.',
          sentAt: '2024-01-15T10:30:00Z',
          messageChannel: 'email',
          notes: 'Follow up on project discussion'
        }
      })
    );
  });

  it('throws an error when contact is not found', async () => {
    const contactId = 'non-existent-contact-123';
    
    // Stub the event store to return empty array (no events for this contact)
    jest.spyOn(eventStore, 'eventsForAggregate').mockResolvedValue([]);

    const command = new RecordMessageSentToContactCommand({
      contactId: contactId,
      subject: 'Follow up meeting',
      body: 'Thanks for the great meeting today.',
      sentAt: '2024-01-15T10:30:00Z',
      messageChannel: 'email',
      notes: 'Follow up on project discussion'
    });
    const handler = new RecordMessageSentToContactCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toThrow('Contact not found');
  });
});
