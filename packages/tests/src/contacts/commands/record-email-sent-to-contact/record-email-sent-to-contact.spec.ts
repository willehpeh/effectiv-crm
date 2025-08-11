import { FakeEventStore } from '../../../common/fixtures/fake.event-store';
import { RecordEmailSentToContactCommand, RecordEmailSentToContactCommandHandler, RegisterContactCommand, RegisterContactCommandHandler } from '@effectiv-crm/application';
import { FakeEventPublisher } from '../../../common/fixtures/fake-event-publisher';
import { RegisterContactDtoFactory } from '../../fixtures/register-contact-dto.factory';

describe('Record Email Sent To Contact', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;
  const dtoFactory = new RegisterContactDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it('saves an EmailSentToContact event to the event store', async () => {
    // First, register a contact
    const registerDto = dtoFactory.validDto();
    const registerCommand = new RegisterContactCommand(registerDto);
    const registerHandler = new RegisterContactCommandHandler(eventStore, eventPublisher);
    await registerHandler.execute(registerCommand);
    
    const contactId = eventStore.events[0].aggregateId;

    // Then, record an email sent to that contact
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

    expect(eventStore.events).toHaveLength(2);
    expect(eventStore.events[1].eventType).toBe('EmailSentToContact');
    expect(eventStore.events[1].aggregateId).toBe(contactId);
    expect(eventStore.events[1].payload).toEqual({
      subject: 'Follow up meeting',
      body: 'Thanks for the great meeting today.',
      sentAt: new Date('2024-01-15T10:30:00Z'),
      senderEmail: 'user@example.com',
      notes: 'Follow up on project discussion'
    });
  });
});
