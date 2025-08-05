import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { 
  LeadsProjection,
  LeadCapturedHandler,
  CaptureLeadCommandHandler,
  GetAllLeadsQueryHandler
} from '@effectiv-crm/application';
import { InMemoryLeadsProjection } from '@effectiv-crm/infrastructure';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [CqrsModule, ContactsModule],
  providers: [
    // Projection
    {
      provide: LeadsProjection,
      useClass: InMemoryLeadsProjection,
    },
    
    // Event Handler
    LeadCapturedHandler,
    
    // Command & Query Handlers
    CaptureLeadCommandHandler,
    GetAllLeadsQueryHandler,
  ],
  exports: [LeadsProjection],
})
export class LeadsEventsModule {}
