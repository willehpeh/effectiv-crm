import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './database-config.service';

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
  ],
  providers: [DatabaseConfigService],
  exports: [MikroOrmModule, DatabaseConfigService],
})
export class DatabaseModule {}
