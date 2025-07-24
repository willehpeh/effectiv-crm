import { AggregateRoot } from '../common/aggregate-root';
import { ValueObject } from '../common/value-object';
import { DomainEvent } from '../common/domain-event';
import { LeadCapturedEvent } from './events/lead-captured.event';

export class LeadId extends ValueObject<string> {}

export class Lead extends AggregateRoot {
  private readonly _id: LeadId;

  private constructor(id: LeadId) {
    super();
    this._id = id;
  }

  static captureNew(payload: object): Lead {
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
