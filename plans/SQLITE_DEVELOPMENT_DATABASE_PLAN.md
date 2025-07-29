# SQLite Development Database Implementation Plan

## Overview
Implement SQLite as the local development database while keeping PostgreSQL for production. This will provide faster setup, no Docker dependency for local dev, and easier testing. The API project will choose which database module to import based on environment configuration.

## Architecture Decision
Use **separate modules approach** rather than conditional imports:
- `DatabaseModule` - PostgreSQL configuration (production/staging)
- `SqliteDatabaseModule` - SQLite configuration (development/testing)
- API project imports the appropriate module based on `DB_TYPE` environment variable

## 1. Dependencies
Add SQLite driver to package.json:
```bash
npm install @mikro-orm/sqlite
```

## 2. Environment Configuration
- Add `DB_TYPE` environment variable (`postgresql` | `sqlite`)
- Update `.env.development` to use `DB_TYPE=sqlite`
- Add SQLite-specific configuration options:
  - `SQLITE_DB_PATH` - Path to SQLite database file
  - `SQLITE_IN_MEMORY` - Use in-memory database for tests

## 3. Database Configuration Service Updates
- Extend `DatabaseConfigService` to support SQLite driver configuration
- Create separate methods: `createPostgreSqlOptions()` and `createSqliteOptions()`
- Add validation for SQLite-specific configuration

## 4. SQLite Database Module
Create new `SqliteDatabaseModule`:
- Uses SQLite driver from `@mikro-orm/sqlite`
- Configures file-based database for development
- Supports in-memory database for testing
- Same entity configuration as PostgreSQL module
- Same EventStore provider (MikroOrmEventStore works with both)

## 5. Module Structure
```
packages/infrastructure/src/database/
├── database.module.ts              # PostgreSQL module
├── sqlite-database.module.ts       # SQLite module  
├── database-config.service.ts      # Updated to support both
├── database-config.validation.ts   # Updated validation
├── mikro-orm-event-store.ts        # Works with both drivers
└── entities/
    └── event.entity.ts             # Same entity for both
```

## 6. API Project Integration
Update API module imports:
```typescript
// In API app.module.ts or database imports
const DatabaseModuleToUse = process.env.DB_TYPE === 'sqlite' 
  ? SqliteDatabaseModule 
  : DatabaseModule;

@Module({
  imports: [DatabaseModuleToUse, ...],
  // ...
})
```

## 7. SQLite Schema Management
- SQLite will use schema generation instead of migrations for development
- `autoLoadEntities: true` and `synchronize: true` for development
- Production PostgreSQL continues using migrations
- Add npm script for SQLite schema reset: `npm run db:reset:sqlite`

## 8. Testing Updates
- Update integration tests to support both databases
- Add SQLite-specific integration tests
- TestContainers still used for PostgreSQL tests
- SQLite tests can use in-memory database for speed

## 9. Development Workflow
Local development:
```bash
# Set environment for SQLite
export DB_TYPE=sqlite
# or use .env.development

# Start API (no Docker needed)
npx nx serve api

# Reset database schema
npm run db:reset:sqlite
```

Production/staging:
```bash
# Set environment for PostgreSQL  
export DB_TYPE=postgresql

# Start with Docker
docker-compose up -d postgres
npx nx serve api
```

## 10. Migration Strategy
- **Development**: SQLite with schema generation (no migrations)
- **Production**: PostgreSQL with migrations
- **CI/CD**: Test against both databases in separate jobs
- **Integration Tests**: Support both via environment configuration

## 11. Configuration Examples

`.env.development`:
```env
DB_TYPE=sqlite
SQLITE_DB_PATH=./data/effectiv-crm-dev.db
SQLITE_IN_MEMORY=false
NODE_ENV=development
```

`.env.test`:
```env
DB_TYPE=sqlite
SQLITE_IN_MEMORY=true
NODE_ENV=test
```

Production:
```env
DB_TYPE=postgresql
DB_HOST=production-host
DB_PORT=5432
# ... other PostgreSQL config
```

## 12. Benefits
- **Faster Development**: No Docker dependency for local dev
- **Easier Onboarding**: New developers just run `npm install && npm start`
- **Testing Speed**: In-memory SQLite for unit/integration tests
- **Production Parity**: Still use PostgreSQL in production
- **Flexibility**: Easy to switch between databases via environment

## 13. File Changes Required
- [ ] `package.json` - Add @mikro-orm/sqlite dependency
- [ ] `database-config.service.ts` - Add SQLite configuration support
- [ ] `database-config.validation.ts` - Add SQLite validation rules
- [ ] `sqlite-database.module.ts` - New SQLite module
- [ ] `.env.development` - Update to use SQLite
- [ ] `.env.example` - Add SQLite configuration options
- [ ] API module imports - Conditional database module import
- [ ] Integration test updates - Support both databases
- [ ] `package.json` scripts - Add SQLite database management

## 14. Implementation Order
1. Add dependencies and environment configuration
2. Update DatabaseConfigService for SQLite support  
3. Create SqliteDatabaseModule
4. Update API project to conditionally import modules
5. Test SQLite functionality with existing event store
6. Update integration tests to support both databases
7. Update documentation and development setup guides

This approach maintains clean separation between database implementations while reusing the existing MikroOrmEventStore and entity definitions.
