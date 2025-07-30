import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CaptureLeadCommand, CaptureLeadDto } from '@effectiv-crm/application';

@Injectable()
export class LeadsService {
  constructor(private readonly commandBus: CommandBus) {}

  async captureLead(dto: CaptureLeadDto): Promise<void> {
    const command = new CaptureLeadCommand(dto);
    await this.commandBus.execute(command);
  }
}
