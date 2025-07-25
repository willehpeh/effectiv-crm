import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { ContactRegisteredEvent } from './events/contact-registered.event';
import { EmailAddress } from '../leads/value-objects/email-address';

export class ContactId extends ValueObject<string> {}

export class Contact extends AggregateRoot {
  private readonly _id: ContactId;
  private readonly _email: EmailAddress;

  private constructor(id: ContactId, email: EmailAddress) {
    super();
    this._id = id;
    this._email = email;
  }

  static register(email: EmailAddress): Contact {
    const id = crypto.randomUUID();
    const contactId = new ContactId(id);
    const contact = new Contact(contactId, email);
    const event = new ContactRegisteredEvent(id, { email: email.value() });
    contact.apply(event);
    return contact;
  }

  id(): ValueObject<string> {
    return this._id;
  }

  email(): EmailAddress {
    return this._email;
  }

  protected replayEvent(event: DomainEvent): void {
    switch (event.eventType) {
      case 'ContactRegistered':
        break;
    }
  }
}
