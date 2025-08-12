import { Module } from '@nestjs/common';
import { DatabaseModule, EventStream, ProjectionEventStream, ProjectionStartupService } from '@effectiv-crm/infrastructure';
import { EventPublisher } from '@effectiv-crm/application';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    DatabaseModule,
    CqrsModule
  ],
  providers: [
    EventStream,
    {
      provide: EventPublisher,
      useExisting: EventStream,
    },
    ProjectionEventStream,
    ProjectionStartupService
  ],
  exports: [EventStream, ProjectionEventStream, EventPublisher, DatabaseModule]
})
export class EventsModule {}
