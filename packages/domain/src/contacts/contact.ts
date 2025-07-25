import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { ContactRegisteredEvent } from './events/contact-registered.event';
import { EmailAddress } from '../leads/value-objects/email-address';
import { FirstName } from './value-objects/first-name';

export class ContactId extends ValueObject<string> {}

export class Contact extends AggregateRoot {
  private readonly _id: ContactId;
  private readonly _email: EmailAddress;
  private readonly _firstName: FirstName;

  private constructor(id: ContactId, email: EmailAddress, firstName: FirstName) {
    super();
    this._id = id;
    this._email = email;
    this._firstName = firstName;
  }

  static register(email: EmailAddress, firstName: FirstName): Contact {
    const id = crypto.randomUUID();
    const contactId = new ContactId(id);
    const contact = new Contact(contactId, email, firstName);
    const event = new ContactRegisteredEvent(id, { email: email.value(), firstName: firstName.value() });
    contact.apply(event);
    return contact;
  }

  id(): ValueObject<string> {
    return this._id;
  }

  email(): EmailAddress {
    return this._email;
  }

  firstName(): FirstName {
    return this._firstName;
  }

  protected replayEvent(event: DomainEvent): void {
    switch (event.eventType) {
      case 'ContactRegistered':
        break;
    }
  }
}
