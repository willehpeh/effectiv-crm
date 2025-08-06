import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { CaptureLeadCommandHandler, GetAllLeadsQueryHandler, LeadProjection } from '@effectiv-crm/application';
import { InMemoryLeadsProjection } from '@effectiv-crm/infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { EventsModule } from '../events.module';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  controllers: [LeadsController],
  providers: [
    LeadsService,
    {
      provide: LeadProjection,
      useClass: InMemoryLeadsProjection,
    },
    CaptureLeadCommandHandler,
    GetAllLeadsQueryHandler,
  ],
  imports: [
    CqrsModule,
    EventsModule,
    ContactsModule,
  ],
  exports: [LeadsService],
})
export class LeadsModule {}
