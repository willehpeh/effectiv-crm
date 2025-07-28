import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  createMikroOrmOptions(): Options {
    return {
      driver: PostgreSqlDriver,
      host: this.configService.get<string>('DB_HOST', 'postgres'),
      port: this.configService.get<number>('DB_PORT', 5432),
      user: this.configService.get<string>('DB_USER', 'effectiv_user'),
      password: this.configService.get<string>('DB_PASSWORD') || 
               this.configService.get<string>('POSTGRES_PASSWORD', 'effectiv_password'),
      dbName: this.configService.get<string>('DB_NAME', 'effectiv_crm'),
      
      // Connection pooling - optimized for application use
      pool: {
        min: 2,
        max: 10,
        acquireTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,
      },
      
      // Entity discovery
      entities: ['dist/packages/infrastructure/src/database/entities/*.js'],
      entitiesTs: ['packages/infrastructure/src/database/entities/*.ts'],
      
      // Migrations
      migrations: {
        path: 'packages/infrastructure/src/database/migrations',
        pathTs: 'packages/infrastructure/src/database/migrations',
        tableName: 'mikro_orm_migrations',
        transactional: true,
        // Auto-run migrations in development
        ...(this.configService.get<string>('NODE_ENV') === 'development' && {
          disableForeignKeys: false,
        }),
      },
      
      // Metadata provider for TypeScript reflection
      metadataProvider: TsMorphMetadataProvider,
      
      // Extensions
      extensions: [Migrator],
      
      // Environment-specific settings
      debug: this.configService.get<string>('NODE_ENV') === 'development',
      
      // Schema settings
      schemaGenerator: {
        disableForeignKeys: false,
        createForeignKeyConstraints: true,
      },
      
      // PostgreSQL specific settings
      timezone: 'UTC',
      
      // Performance and reliability settings
      forceEntityConstructor: true,
      validate: true,
      strict: true,
      
      // Auto-load entities in development for convenience
      ...(this.configService.get<string>('NODE_ENV') === 'development' && {
        autoLoadEntities: true,
      }),
    };
  }

  isDevelopment(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'development';
  }

  isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }
}
