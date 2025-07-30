import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { getDatabaseModule } from '@effectiv-crm/infrastructure';
import { CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
  imports: [CqrsModule, getDatabaseModule()],
  controllers: [LeadsController],
  providers: [
    LeadsService,
    CaptureLeadCommandHandler,
  ],
  exports: [LeadsService],
})
export class LeadsModule {}
