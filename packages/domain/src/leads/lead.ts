import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { LeadCapturedEvent } from './events/lead-captured.event';
import { ContactId } from '../contacts/contact';
import { LeadSource } from './value-objects/lead-source';

export class LeadId extends ValueObject<string> {}

export class Lead extends AggregateRoot {
  private readonly _id: LeadId;
  private readonly _contactId: ContactId;
  private readonly _source: LeadSource;

  private constructor(id: LeadId,
                      contactId: ContactId,
                      source: LeadSource) {
    super();
    this._id = id;
    this._contactId = contactId;
    this._source = source;
  }

  static captureNew(contactId: ContactId, source: LeadSource): Lead {
    const id = crypto.randomUUID();
    const leadId = new LeadId(id);
    const lead = new Lead(leadId, contactId, source);
    const event = new LeadCapturedEvent(id, { contactId: contactId.value(), source: source.value() });
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
