import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaptureLeadCommand } from './capture-lead.command';
import { EventStore, Lead } from '@effectiv-crm/domain';

@CommandHandler(CaptureLeadCommand)
export class CaptureLeadCommandHandler implements ICommandHandler<CaptureLeadCommand> {

  constructor(private readonly eventStore: EventStore) {
  }

  async execute(command: CaptureLeadCommand): Promise<any> {
    const lead = Lead.captureNew(command.dto);
    const events = lead.getUncommittedEvents();
    const leadId = lead.id().value();
    await this.eventStore.saveEvents(leadId, events);
    lead.markEventsAsCommitted();
  }

}
