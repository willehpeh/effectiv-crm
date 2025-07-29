import { Injectable } from '@nestjs/common';
import { DatabaseConfigService } from '@effectiv-crm/infrastructure';

@Injectable()
export class AppService {
  constructor(private readonly databaseConfig: DatabaseConfigService) {}

  getHello(): string {
    return 'EffectiV CRM API is running!';
  }

  getHealth(): { status: string; database: string } {
    return {
      status: 'healthy',
      database: this.databaseConfig.getDatabaseType(),
    };
  }
}
