import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { 
  ContactProjection,
  ContactProjector
} from '@effectiv-crm/application';
import { InMemoryContactProjection } from '@effectiv-crm/infrastructure';

@Module({
  imports: [CqrsModule],
  providers: [
    // Projection
    {
      provide: ContactProjection,
      useClass: InMemoryContactProjection,
    },
    
    // Projector (Event Handler)
    ContactProjector,
  ],
  exports: [ContactProjection],
})
export class ContactsModule {}
