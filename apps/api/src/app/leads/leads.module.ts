import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@effectiv-crm/infrastructure';
import { CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule
  ],
  controllers: [LeadsController],
  providers: [
    LeadsService,
    CaptureLeadCommandHandler,
  ],
  exports: [LeadsService],
})
export class LeadsModule {}
