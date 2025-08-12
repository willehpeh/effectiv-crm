import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RecordEmailSentToContactCommand } from './record-email-sent-to-contact.command';
import { EventStore, Contact } from '@effectiv-crm/domain';
import { EventPublisher } from '../../../common';

@CommandHandler(RecordEmailSentToContactCommand)
export class RecordEmailSentToContactCommandHandler implements ICommandHandler<RecordEmailSentToContactCommand> {

  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher
  ) {
  }

  async execute(command: RecordEmailSentToContactCommand): Promise<void> {
    const events = await this.eventStore.eventsForAggregate(command.dto.contactId);
    
    if (events.length === 0) {
      throw new Error('Contact not found');
    }
    
    const contact = Contact.hydrate(events);
    
    contact.recordEmailSent({
      subject: command.dto.subject,
      body: command.dto.body,
      sentAt: command.dto.sentAt,
      senderEmail: command.dto.senderEmail,
      notes: command.dto.notes
    });

    const uncommittedEvents = contact.getUncommittedEvents();
    await this.eventStore.saveEvents(uncommittedEvents);
    contact.markEventsAsCommitted();
    
    uncommittedEvents.forEach(event => this.eventPublisher.publish(event));
  }
}
