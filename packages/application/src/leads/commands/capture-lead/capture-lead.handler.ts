import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaptureLeadCommand } from './capture-lead.command';
import { Contact, EmailAddress, EventStore, FirstName, Lead } from '@effectiv-crm/domain';

@CommandHandler(CaptureLeadCommand)
export class CaptureLeadCommandHandler implements ICommandHandler<CaptureLeadCommand> {

  constructor(private readonly eventStore: EventStore) {
  }

  async execute(command: CaptureLeadCommand): Promise<void> {
    const contact = this.registerContact(command);
    const lead = this.captureLead(contact);

    const allEvents = [
      ...contact.getUncommittedEvents(),
      ...lead.getUncommittedEvents()
    ];
    await this.eventStore.saveEvents(allEvents);

    contact.markEventsAsCommitted();
    lead.markEventsAsCommitted();
  }

  private captureLead(contact: Contact): Lead {
    return Lead.captureNew(contact.id());
  }

  private registerContact(command: CaptureLeadCommand): Contact {
    const email = EmailAddress.fromString(command.dto.contactInfo.email);
    const firstName = FirstName.fromString(command.dto.contactInfo.firstName);
    return Contact.register(email, firstName);
  }
}
