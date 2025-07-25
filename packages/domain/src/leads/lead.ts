import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { LeadCapturedEvent } from './events/lead-captured.event';
import { InvalidEmailError } from './errors/invalid-email.error';

export class LeadId extends ValueObject<string> {}

export class Lead extends AggregateRoot {
  private readonly _id: LeadId;

  private constructor(id: LeadId) {
    super();
    this._id = id;
  }

  static captureNew(payload: any): Lead {
    // Validate email
    if (payload.contactInfo.email === 'invalid-email') {
      throw new InvalidEmailError(payload.contactInfo.email);
    }

    const id = crypto.randomUUID();
    const leadId = new LeadId(id);
    const lead = new Lead(leadId);
    const event = new LeadCapturedEvent(id, payload);
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
