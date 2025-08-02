import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { EventStore } from '@effectiv-crm/domain';
import { DatabaseConfigService } from './database-config.service';
import { EventEntity } from './entities/event.entity';
import { MikroOrmEventStore } from './mikro-orm-event-store';
import { AuthContext } from '../context/auth.context';
import { RequestContext } from '../context/request.context';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      providers: [DatabaseConfigService],
      inject: [DatabaseConfigService],
      useFactory: (databaseConfigService: DatabaseConfigService) =>
        databaseConfigService.createDatabaseOptions(),
    }),
    MikroOrmModule.forFeature([EventEntity]),
  ],
  providers: [
    DatabaseConfigService,
    {
      provide: EventStore,
      useClass: MikroOrmEventStore,
    },
    AuthContext,
    RequestContext
  ],
  exports: [MikroOrmModule, DatabaseConfigService, EventStore, AuthContext, RequestContext],
})
export class DatabaseModule {}
