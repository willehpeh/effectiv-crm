import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { 
  ContactProjection,
  ContactRegisteredHandler
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
    
    // Event Handler
    ContactRegisteredHandler,
  ],
  exports: [ContactProjection],
})
export class ContactsModule {}
