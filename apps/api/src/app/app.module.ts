import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getDatabaseModule } from '@effectiv-crm/infrastructure';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './leads/leads.module';

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
    getDatabaseModule(),
    LeadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
