import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { EventStore } from '@effectiv-crm/domain';
import { DatabaseConfigService } from './database-config.service';
import { EventEntity } from './entities/event.entity';
import { PostgresEventStore } from './postgres-event-store';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      providers: [DatabaseConfigService],
      inject: [DatabaseConfigService],
      useFactory: (databaseConfigService: DatabaseConfigService) => 
        databaseConfigService.createMikroOrmOptions(),
    }),
    MikroOrmModule.forFeature([EventEntity]),
  ],
  providers: [
    DatabaseConfigService,
    {
      provide: EventStore,
      useClass: PostgresEventStore,
    },
  ],
  exports: [MikroOrmModule, DatabaseConfigService, EventStore],
})
export class DatabaseModule {}
