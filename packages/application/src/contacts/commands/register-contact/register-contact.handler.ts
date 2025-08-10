import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterContactCommand } from './register-contact.command';
import {
  Company,
  Contact,
  EmailAddress,
  EventStore,
  FirstName,
  LastName
} from '@effectiv-crm/domain';
import { EventPublisher } from '../../../common';

@CommandHandler(RegisterContactCommand)
export class RegisterContactCommandHandler implements ICommandHandler<RegisterContactCommand> {

  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher
  ) {
  }

  async execute(command: RegisterContactCommand): Promise<void> {
    const contact = this.registerContact(command);

    const events = contact.getUncommittedEvents();
    await this.eventStore.saveEvents(events);

    events.forEach(event => this.eventPublisher.publish(event));

    contact.markEventsAsCommitted();
  }

  private registerContact(command: RegisterContactCommand): Contact {
    const email = EmailAddress.fromString(command.dto.email);
    const firstName = FirstName.fromString(command.dto.firstName);
    const lastName = LastName.fromString(command.dto.lastName);
    const company = command.dto.company ? Company.fromString(command.dto.company) : undefined;
    return Contact.register({ email: email, firstName: firstName, lastName: lastName, company: company });
  }
}
