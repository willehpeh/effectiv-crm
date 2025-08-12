import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { ContactsModule } from './contacts/contacts.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CorrelationMiddleware } from './middleware/correlation.middleware';
import { StartupService } from './startup.service';
import { EventsModule } from './events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env'
      ],
    }),
    CqrsModule,
    EventsModule,
    ContactsModule,

  ],
  providers: [StartupService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
