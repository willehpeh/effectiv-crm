import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { LeadCapturedEvent } from './events/lead-captured.event';
import { ContactId } from '../contacts/contact';
import { LeadSource } from './value-objects/lead-source';
import { ContactDate } from './value-objects/contact-date';
import { Referrer } from './value-objects/referrer';
import { MissingReferrerError } from './errors/missing-referrer.error';

export class LeadId extends ValueObject<string> {
}

export class Lead extends AggregateRoot {
  private readonly _id: LeadId;
  private readonly _contactId: ContactId;
  private readonly _source: LeadSource;
  private readonly _contactDate: ContactDate;
  private readonly _referrer?: Referrer;

  private constructor(id: LeadId,
                      contactId: ContactId,
                      source: LeadSource,
                      contactDate: ContactDate,
                      referrer: Referrer) {
    super();
    this.validate(source, referrer);
    this._id = id;
    this._contactId = contactId;
    this._source = source;
    this._contactDate = contactDate;
    if (source.isReferral()) {
      this._referrer = referrer;
    }
  }

  private validate(source: LeadSource, referrer: Referrer) {
    if (source.isReferral() && referrer.isEmpty()) {
      throw new MissingReferrerError();
    }
  }

  static captureNew({ contactId, source, contactDate, referrer }: {
    contactId: ContactId,
    source: LeadSource,
    contactDate: ContactDate,
    referrer: Referrer
  }): Lead {
    const id = crypto.randomUUID();
    const leadId = new LeadId(id);
    const lead = new Lead(leadId, contactId, source, contactDate, referrer);
    const event = new LeadCapturedEvent(id, {
      contactId: contactId.value(),
      source: source.value(),
      contactDate: contactDate.value()
    });
    lead.apply(event);
    return lead;
  }

  id(): ValueObject<string> {
    return this._id;
  }

  protected replayEvent(event: DomainEvent): void {
    switch (event.eventType) {
      case 'LeadCaptured':
        // Creation event - no state changes needed beyond version
        break;
    }
  }
}
