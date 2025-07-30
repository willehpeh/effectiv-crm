import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { Migrator } from '@mikro-orm/migrations';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  createPostgreSqlOptions(): Options {
    return {
      driver: PostgreSqlDriver,
      host: this.configService.get<string>('DB_HOST', 'postgres'),
      port: this.configService.get<number>('DB_PORT', 5432),
      user: this.configService.get<string>('DB_USER', 'effectiv_user'),
      password: this.configService.get<string>('DB_PASSWORD') ||
               this.configService.get<string>('POSTGRES_PASSWORD', 'effectiv_password'),
      dbName: this.configService.get<string>('DB_NAME', 'effectiv_crm'),

      // Connection pooling - configurable via environment
      pool: {
        min: this.configService.get<number>('DB_POOL_MIN', 2),
        max: this.configService.get<number>('DB_POOL_MAX', 10),
        acquireTimeoutMillis: this.configService.get<number>('DB_POOL_ACQUIRE_TIMEOUT', 30000),
        createTimeoutMillis: this.configService.get<number>('DB_POOL_CREATE_TIMEOUT', 30000),
        destroyTimeoutMillis: this.configService.get<number>('DB_POOL_DESTROY_TIMEOUT', 5000),
        idleTimeoutMillis: this.configService.get<number>('DB_POOL_IDLE_TIMEOUT', 30000),
        reapIntervalMillis: this.configService.get<number>('DB_POOL_REAP_INTERVAL', 1000),
        createRetryIntervalMillis: this.configService.get<number>('DB_POOL_CREATE_RETRY_INTERVAL', 200),
      },

      // Use autoLoadEntities for NestJS module integration
      autoLoadEntities: true,

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

      // Use default metadata provider (reflection) to avoid webpack issues

      // Extensions
      extensions: [Migrator],

      // Environment-specific settings
      debug: this.configService.get<boolean>('DB_DEBUG', this.configService.get<string>('NODE_ENV') === 'development'),

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

      // Auto-load entities - configurable via environment
      ...(this.configService.get<boolean>('DB_AUTO_LOAD_ENTITIES', this.configService.get<string>('NODE_ENV') === 'development') && {
        autoLoadEntities: true,
      }),
    };
  }

  createSqliteOptions(): Options {
    const dbPath = this.configService.get<string>('SQLITE_DB_PATH', './data/effectiv-crm-dev.db');

    console.log('DBPATH: ', dbPath);

    return {
      driver: SqliteDriver,
      dbName: dbPath,

      // SQLite doesn't use migrations in development - use schema generation
      schemaGenerator: {
        disableForeignKeys: false,
        createForeignKeyConstraints: true,
      },

      // Environment-specific settings
      debug: this.configService.get<boolean>('DB_DEBUG', this.configService.get<string>('NODE_ENV') === 'development'),

      // Performance and reliability settings
      forceEntityConstructor: true,
      validate: true,
      strict: true,

      // Auto-load entities and sync schema for development
      ...(this.configService.get<boolean>('DB_AUTO_LOAD_ENTITIES', this.configService.get<string>('NODE_ENV') === 'development') && {
        autoLoadEntities: true,
      }),

      // Enable schema synchronization for SQLite in development
      ...(this.isDevelopment() && {
        synchronize: true,
      }),
    };
  }

  isDevelopment(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'development';
  }

  isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  getDatabaseType(): string {
    return this.configService.get<string>('DB_TYPE', 'postgresql');
  }
}
