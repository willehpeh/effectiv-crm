import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

// Minimal CLI configuration - reads directly from environment variables
// Primary configuration is in DatabaseModule for NestJS integration
const config: Options = {
  driver: PostgreSqlDriver,
  host: process.env['DB_HOST'] || 'postgres',
  port: parseInt(process.env['DB_PORT'] || '5432'),
  user: process.env['DB_USER'] || 'effectiv_user',
  password: process.env['DB_PASSWORD'] || process.env['POSTGRES_PASSWORD'] || 'effectiv_password',
  dbName: process.env['DB_NAME'] || 'effectiv_crm',

  // Entity discovery for CLI
  entities: ['dist/packages/infrastructure/src/database/entities/*.js'],
  entitiesTs: ['packages/infrastructure/src/database/entities/*.ts'],

  // Migrations configuration
  migrations: {
    path: 'packages/infrastructure/src/database/migrations',
    pathTs: 'packages/infrastructure/src/database/migrations',
    tableName: 'mikro_orm_migrations',
    transactional: true,
  },

  // Required for CLI operations
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  timezone: 'UTC',
};

export default config;
