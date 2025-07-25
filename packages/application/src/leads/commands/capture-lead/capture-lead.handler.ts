import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaptureLeadCommand } from './capture-lead.command';
import { Contact, EmailAddress, EventStore, FirstName, Lead } from '@effectiv-crm/domain';

@CommandHandler(CaptureLeadCommand)
export class CaptureLeadCommandHandler implements ICommandHandler<CaptureLeadCommand> {

  constructor(private readonly eventStore: EventStore) {
  }

  async execute(command: CaptureLeadCommand): Promise<void> {
    const email = EmailAddress.fromString(command.dto.contactInfo.email);
    const firstName = FirstName.fromString(command.dto.contactInfo.firstName);
    const contact = Contact.register(email, firstName);
    const contactEvents = contact.getUncommittedEvents();
    const contactId = contact.id().value();
    await this.eventStore.saveEvents(contactId, contactEvents);
    contact.markEventsAsCommitted();

    const lead = Lead.captureNew(contact.id());
    const leadEvents = lead.getUncommittedEvents();
    const leadId = lead.id().value();
    await this.eventStore.saveEvents(leadId, leadEvents);
    lead.markEventsAsCommitted();
  }

}
