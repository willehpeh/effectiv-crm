import { Controller, Post, Body } from '@nestjs/common';
import { CaptureLeadDto } from '@effectiv-crm/application';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('capture')
  async captureLead(@Body() dto: CaptureLeadDto): Promise<void> {
    await this.leadsService.captureLead(dto);
  }
}
