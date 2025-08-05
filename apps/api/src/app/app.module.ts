import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule, NestjsEventPublisher } from '@effectiv-crm/infrastructure';
import { EventPublisher } from '@effectiv-crm/application';
import { LeadsModule } from './leads/leads.module';
import { LeadsEventsModule } from './leads/leads-events.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CorrelationMiddleware } from './middleware/correlation.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env'
      ],
    }),
    CqrsModule,
    DatabaseModule,
    ContactsModule,
    LeadsEventsModule,
    LeadsModule,
  ],
  providers: [
    // Global EventPublisher
    {
      provide: EventPublisher,
      useClass: NestjsEventPublisher,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
