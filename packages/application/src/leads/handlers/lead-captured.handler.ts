import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LeadCapturedEvent, DomainEvent } from '@effectiv-crm/domain';
import { LeadReadModel } from '../read-models/lead.read-model';
import { LeadProjection } from '../projections/lead.projection';
import { ContactProjection } from '../../contacts';

@Injectable()
@EventsHandler(LeadCapturedEvent)
export class LeadCapturedHandler implements IEventHandler<LeadCapturedEvent> {
  constructor(
    private readonly leadsProjection: LeadProjection,
    private readonly contactProjection: ContactProjection,
  ) {}

  async handle(event: LeadCapturedEvent): Promise<void> {
    const contact = this.contactProjection.getContactById(event.payload.contactId);

    if (!contact) {
      throw new Error(`Contact with id ${event.payload.contactId} not found`);
    }

    const lead: LeadReadModel = {
      id: event.aggregateId,
      contactId: event.payload.contactId,
      contactName: contact.name,
      contactEmail: contact.email,
      source: event.payload.source,
      capturedAt: event.payload.contactDate,
    };

    this.leadsProjection.addLead(lead);
  }

  async rebuild(events: DomainEvent[]): Promise<void> {
    const leadCapturedEvents = events.filter(event => event.eventType === 'LeadCaptured');

    for (const event of leadCapturedEvents) {
      await this.handle(event as LeadCapturedEvent);
    }
  }
}
