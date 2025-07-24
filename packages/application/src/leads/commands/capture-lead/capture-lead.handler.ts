import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CaptureLeadCommand } from './capture-lead.command';
import { EventStore, LeadCapturedEvent } from '@effectiv-crm/domain';

@CommandHandler(CaptureLeadCommand)
export class CaptureLeadCommandHandler implements ICommandHandler<CaptureLeadCommand> {

  constructor(private readonly eventStore: EventStore) {
  }

  async execute(command: CaptureLeadCommand): Promise<any> {
    const event = new LeadCapturedEvent('lead-1', 1, command.dto);
    await this.eventStore.saveEvents('lead-1', [event]);
  }

}
