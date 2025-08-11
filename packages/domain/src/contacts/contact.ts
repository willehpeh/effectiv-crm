import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { ContactRegisteredEvent } from './events/contact-registered.event';
import { EmailSentToContactEvent, EmailSentToContactPayload } from './events/email-sent-to-contact.event';
import { EmailAddress } from './value-objects/email-address';
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
  private _lastContactDate?: Date;
  private _communicationCount = 0;

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

  static hydrate(events: DomainEvent[]): Contact {
    if (events.length === 0) {
      throw new Error('Cannot hydrate Contact without events');
    }
    
    const firstEvent = events[0] as ContactRegisteredEvent;
    const contact = new Contact(
      new ContactId(firstEvent.aggregateId),
      new EmailAddress(firstEvent.payload.email),
      new FirstName(firstEvent.payload.firstName),
      new LastName(firstEvent.payload.lastName),
      firstEvent.payload.company ? new Company(firstEvent.payload.company) : undefined
    );
    
    contact.hydrate(events);
    return contact;
  }

  id(): ValueObject<string> {
    return this._id;
  }

  recordEmailSent(payload: EmailSentToContactPayload): void {
    const event = new EmailSentToContactEvent(this._id.value(), this.version + 1, payload);
    this.apply(event);
  }

  protected replayEvent(event: DomainEvent): void {
    switch (event.eventType) {
      case 'ContactRegistered':
        break;
      case 'EmailSentToContact':
        const emailEvent = event as EmailSentToContactEvent;
        this._lastContactDate = emailEvent.payload.sentAt;
        this._communicationCount++;
        break;
    }
  }
}
