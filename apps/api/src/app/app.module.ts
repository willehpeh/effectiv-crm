import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthContext, getDatabaseModule, RequestContext } from '@effectiv-crm/infrastructure';
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
  providers: [
    AuthContext,
    RequestContext
  ],
})
export class AppModule {}
