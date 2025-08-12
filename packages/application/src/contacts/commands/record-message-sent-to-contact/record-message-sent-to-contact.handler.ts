import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RecordMessageSentToContactCommand } from './record-message-sent-to-contact.command';
import { EventStore, Contact } from '@effectiv-crm/domain';
import { EventPublisher } from '../../../common';

@CommandHandler(RecordMessageSentToContactCommand)
export class RecordMessageSentToContactCommandHandler implements ICommandHandler<RecordMessageSentToContactCommand> {

  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher
  ) {
  }

  async execute(command: RecordMessageSentToContactCommand): Promise<void> {
    const events = await this.eventStore.eventsForAggregate(command.dto.contactId);
    
    if (events.length === 0) {
      throw new Error('Contact not found');
    }
    
    const contact = Contact.hydrate(events);
    
    contact.recordMessageSent({
      subject: command.dto.subject,
      body: command.dto.body,
      sentAt: command.dto.sentAt,
      messageChannel: command.dto.messageChannel,
      notes: command.dto.notes
    });

    const uncommittedEvents = contact.getUncommittedEvents();
    await this.eventStore.saveEvents(uncommittedEvents);
    contact.markEventsAsCommitted();
    
    uncommittedEvents.forEach(event => this.eventPublisher.publish(event));
  }
}
