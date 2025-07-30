import { DatabaseModule } from './database.module';
import { SqliteDatabaseModule } from './sqlite-database.module';

export function getDatabaseModule() {
  return process.env.DB_TYPE === 'sqlite' 
    ? SqliteDatabaseModule 
    : DatabaseModule;
}
