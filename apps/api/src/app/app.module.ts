import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@effectiv-crm/infrastructure';
import { LeadsModule } from './leads/leads.module';
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
    LeadsModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
