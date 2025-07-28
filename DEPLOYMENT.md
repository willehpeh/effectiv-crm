# Deployment Guide

## Production Deployment with Migration Service

This project uses a Docker Compose migration service approach for safe database migrations in production.

### Migration Strategy

**Separate Migration Service:**
- Migrations run as a dedicated Docker service before the API starts
- Uses the same Docker image as the API for consistency
- Runs once and exits (no restart policy)
- API waits for successful migration completion

### Deployment Commands

**Option 1: Full Deployment (Recommended)**
```bash
# Runs migrations first, then starts the application
npm run deploy:full
```

**Option 2: Step-by-Step Deployment**
```bash
# 1. Run migrations
npm run deploy:migrate

# 2. Start application services (after migrations succeed)
npm run deploy:start
```

**Option 3: Manual Docker Compose**
```bash
# 1. Run migrations
docker-compose --profile migration up migrations

# 2. Start application (after migrations complete)
docker-compose --profile app up -d
```

### Production Configuration

**Environment Variables:**
```bash
# Required
POSTGRES_PASSWORD=your_secure_password

# Optional (defaults provided)
DB_HOST=postgres
DB_PORT=5432
DB_USER=effectiv_user
DB_NAME=effectiv_crm
```

**With Production Overrides:**
```bash
# Use production-specific settings
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml --profile migration up migrations
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml --profile app up -d
```

### Migration Safety

**Zero Downtime Guidelines:**
- Ensure migrations are backward compatible
- Test migrations on staging environment first
- Use feature flags for breaking changes
- Plan rollback strategy before deployment

**Monitoring:**
```bash
# Check migration status
docker-compose logs migrations

# Check API health
curl http://localhost:3000/health
```

### Development vs Production

**Development:**
```bash
# Use development configuration with exposed PostgreSQL port
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up postgres -d
DB_HOST=localhost npm run migration:up
```

**Production:**
```bash
# Use migration service approach
npm run deploy:full
```

### Troubleshooting

**Migration Fails:**
```bash
# Check migration logs
docker-compose logs migrations

# Roll back last migration
docker-compose run --rm migrations npm run migration:down
```

**API Won't Start:**
```bash
# Check if migrations completed successfully
docker-compose ps migrations

# Check API logs
docker-compose logs api
```
