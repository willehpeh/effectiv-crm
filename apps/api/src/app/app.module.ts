import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, SqliteDatabaseModule } from '@effectiv-crm/infrastructure';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Choose database module based on environment
const DatabaseModuleToUse = process.env.DB_TYPE === 'sqlite' 
  ? SqliteDatabaseModule 
  : DatabaseModule;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.local',
        '.env.development',
        '.env.test',
        '.env'
      ],
    }),
    DatabaseModuleToUse,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
