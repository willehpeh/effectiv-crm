import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { LeadCapturedEvent } from './events/lead-captured.event';
import { ContactId } from '../contacts/contact';

export class LeadId extends ValueObject<string> {}

export class Lead extends AggregateRoot {
  private readonly _id: LeadId;
  private readonly _contactId: ContactId;

  private constructor(id: LeadId, contactId: ContactId) {
    super();
    this._id = id;
    this._contactId = contactId;
  }

  static captureNew(contactId: ContactId): Lead {
    const id = crypto.randomUUID();
    const leadId = new LeadId(id);
    const lead = new Lead(leadId, contactId);
    const event = new LeadCapturedEvent(id, { contactId: contactId.value() });
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
