import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaptureLeadCommand } from './capture-lead.command';
import {
  Company,
  Contact,
  ContactDate,
  EmailAddress,
  EventStore,
  FirstName,
  LastName,
  Lead,
  LeadSource,
  Referrer
} from '@effectiv-crm/domain';

@CommandHandler(CaptureLeadCommand)
export class CaptureLeadCommandHandler implements ICommandHandler<CaptureLeadCommand> {

  constructor(private readonly eventStore: EventStore) {
  }

  async execute(command: CaptureLeadCommand): Promise<void> {
    const contact = this.registerContact(command);
    const lead = this.captureLead(contact, command);

    const allEvents = [
      ...contact.getUncommittedEvents(),
      ...lead.getUncommittedEvents()
    ];
    await this.eventStore.saveEvents(allEvents);

    contact.markEventsAsCommitted();
    lead.markEventsAsCommitted();
  }

  private captureLead(contact: Contact, command: CaptureLeadCommand): Lead {
    const source = LeadSource.fromString(command.dto.leadDetails.source);
    const contactDate = ContactDate.fromString(command.dto.leadDetails.contactDate);
    const referrer = Referrer.fromString(command.dto.leadDetails.referrer);
    return Lead.captureNew({ contactId: contact.id(), source, contactDate, referrer });
  }

  private registerContact(command: CaptureLeadCommand): Contact {
    const email = EmailAddress.fromString(command.dto.contactInfo.email);
    const firstName = FirstName.fromString(command.dto.contactInfo.firstName);
    const lastName = LastName.fromString(command.dto.contactInfo.lastName);
    const company = command.dto.contactInfo.company ? Company.fromString(command.dto.contactInfo.company) : undefined;
    return Contact.register({ email: email, firstName: firstName, lastName: lastName, company: company });
  }
}
