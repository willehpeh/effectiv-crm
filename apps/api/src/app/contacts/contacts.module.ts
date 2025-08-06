import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ContactProjection } from '@effectiv-crm/application';
import { InMemoryContactProjection } from '@effectiv-crm/infrastructure';
import { EventsModule } from '../events.module';

@Module({
  imports: [
    CqrsModule,
    EventsModule
  ],
  providers: [
    // Projection
    {
      provide: ContactProjection,
      useClass: InMemoryContactProjection,
    },
  ],
  exports: [ContactProjection],
})
export class ContactsModule {}
