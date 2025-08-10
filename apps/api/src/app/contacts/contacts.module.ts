import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ContactProjection, RegisterContactCommandHandler, GetAllContactsQueryHandler } from '@effectiv-crm/application';
import { InMemoryContactProjection } from '@effectiv-crm/infrastructure';
import { EventsModule } from '../events.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    CqrsModule,
    EventsModule
  ],
  controllers: [ContactsController],
  providers: [
    ContactsService,
    RegisterContactCommandHandler,
    GetAllContactsQueryHandler,
    // Projection
    {
      provide: ContactProjection,
      useClass: InMemoryContactProjection,
    },
  ],
  exports: [ContactProjection],
})
export class ContactsModule {}
