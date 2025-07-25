import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { ContactRegisteredEvent } from './events/contact-registered.event';
import { EmailAddress } from '../leads/value-objects/email-address';
import { FirstName } from './value-objects/first-name';
import { LastName } from './value-objects/last-name';
import { Company } from './value-objects/company';

export class ContactId extends ValueObject<string> {}

export class Contact extends AggregateRoot {
  private readonly _id: ContactId;
  private readonly _email: EmailAddress;
  private readonly _firstName: FirstName;
  private readonly _lastName: LastName;
  private readonly _company?: Company;

  private constructor(id: ContactId, email: EmailAddress, firstName: FirstName, lastName: LastName, company?: Company) {
    super();
    this._id = id;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    if (company) {
      this._company = company
    }
  }

  static register({ email, firstName, lastName, company }: {
    email: EmailAddress,
    firstName: FirstName,
    lastName: LastName,
    company?: Company
  }): Contact {
    const id = crypto.randomUUID();
    const contactId = new ContactId(id);
    const contact = new Contact(contactId, email, firstName, lastName, company);

    const eventPayload = {
      email: email.value(),
      firstName: firstName.value(),
      lastName: lastName.value(),
      company: company?.value()
    };
    const event = new ContactRegisteredEvent(id, eventPayload);
    contact.apply(event);
    return contact;
  }

  id(): ValueObject<string> {
    return this._id;
  }

  protected replayEvent(event: DomainEvent): void {
    switch (event.eventType) {
      case 'ContactRegistered':
        break;
    }
  }
}
