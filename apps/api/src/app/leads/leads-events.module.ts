import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { 
  LeadsProjection,
  LeadProjector,
  CaptureLeadCommandHandler,
  GetAllLeadsQueryHandler
} from '@effectiv-crm/application';
import { InMemoryLeadsProjection } from '@effectiv-crm/infrastructure';

@Module({
  imports: [CqrsModule],
  providers: [
    // Projection
    {
      provide: LeadsProjection,
      useClass: InMemoryLeadsProjection,
    },
    
    // Projector (Event Handler)
    LeadProjector,
    
    // Command & Query Handlers
    CaptureLeadCommandHandler,
    GetAllLeadsQueryHandler,
  ],
  exports: [LeadsProjection],
})
export class LeadsEventsModule {}
