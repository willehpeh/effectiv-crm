# PostgreSQL Event Store Implementation Plan

## Overview
Implement a PostgreSQL-based event store in the infrastructure package using MikroORM, with support for event metadata containing ownerId and correlationId. This implementation must align with the existing Clean Architecture and NestJS CQRS setup.

## ✅ 1. Docker Compose Configuration (COMPLETED)
- ✅ Updated existing docker-compose.yaml to add PostgreSQL service
- ✅ Using PostgreSQL 16 (latest stable version)
- ✅ Configured database: `effectiv_crm`, user: `effectiv_user`, password via environment
- ✅ Set connection pool size to 10
- ✅ Added health check with pg_isready
- ✅ Created docker-compose.dev.yaml for development port exposure
- ✅ Added volume for data persistence

## ✅ 2. Dependencies and MikroORM Setup (COMPLETED)
- ✅ Added to package.json dependencies:
  - @mikro-orm/core
  - @mikro-orm/postgresql
  - @mikro-orm/migrations
  - @mikro-orm/nestjs (for NestJS integration)
  - @mikro-orm/reflection
  - @mikro-orm/cli
- ✅ Created hybrid MikroORM configuration (CLI + NestJS)
- ✅ Set up entity discovery and migrations paths
- ✅ Configured JSONB type mapping for PostgreSQL
- ✅ Configured connection pooling (10 connections)
- ✅ Created DatabaseModule and DatabaseConfigService

## ✅ 3. Event Entity Implementation (COMPLETED)
Created Event entity with optimized fields:
- ✅ **id** (bigint, primary key, auto-increment) - serves as global sequence
- ✅ **aggregateId** (uuid, indexed) - optimized for UUID storage
- ✅ **aggregateVersion** (number)
- ✅ **eventType** (string)
- ✅ **occurredOn** (varchar(30)) - exact fit for ISO 8601 timestamp string
- ✅ **payload** (JSONB)
- ✅ **metadata** (JSONB, NOT NULL) - structured as EventMetadata interface:
  ```typescript
  interface EventMetadata {
    ownerId: string;
    correlationId: string;
  }
  ```

✅ **Constraints and indexes implemented:**
- Composite unique constraint on (aggregateId, aggregateVersion) for optimistic locking
- Index on aggregateId for query performance
- Index on eventType for future projections

✅ **Architecture Decision**: Moved EventMetadata to infrastructure package to maintain Clean Architecture boundaries. Domain events remain pure business logic, application layer adds metadata before persistence.

## ✅ 4. PostgreSQL Event Store Implementation (COMPLETED)
- ✅ Implement EventStore abstract class from domain package
- ✅ Implement saveEvents method:
  - ✅ Validate event versions for optimistic locking
  - ✅ Batch insert events using MikroORM EntityManager
  - ✅ Handle version conflicts appropriately
- ✅ Implement getEventsForAggregate method:
  - ✅ Query by aggregateId
  - ✅ Order by id (global sequence)
  - ✅ Deserialize JSONB payload and metadata
  - ✅ Map back to DomainEvent interface
- ✅ Handle serialization/deserialization of domain events
- ✅ Implement proper error handling (propagate errors, no circuit breaker initially)
- ✅ Added AuthContext and RequestContext parameters for metadata injection

## ✅ 5. NestJS Integration (COMPLETED)
- ✅ Create EventStoreModule in infrastructure package (DatabaseModule)
- ✅ Register MikroORM module with PostgreSQL configuration
- ✅ Register PostgreSQL EventStore as provider implementing EventStore abstract class
- ✅ Export EventStore for use in application layer
- ✅ Configure for both development and production environments

## ✅ 6. Database Migrations (COMPLETED)
- ✅ Created initial migration for events table
- ✅ Set up migration commands in package.json:
  - migration:create
  - migration:up
  - migration:down
  - migration:list
- ✅ Added Docker Compose migration service approach (see Migration Strategy below)

## 7. Testing Setup
- Configure testcontainers for PostgreSQL
- Create integration tests for:
  - Basic save and retrieve operations
  - Optimistic locking scenarios (concurrent updates)
  - Error cases (connection failures, constraint violations)
  - Large batch inserts
  - Metadata persistence and retrieval
- Use PostgreSQL 16 (same as production)
- Test with existing domain events and new metadata structure

## 8. Configuration
- Add environment variables for database connection
- Support configuration through:
  - Docker Compose environment
  - Local development .env files
  - Production environment variables
- Create configuration service for database connection parameters

## ✅ 9. Context Classes and Event Updates (COMPLETED)
- ✅ Maintained existing domain events (LeadCapturedEvent, ContactRegisteredEvent) without changes
- ✅ Moved EventMetadata interface to infrastructure package (Clean Architecture)
- ✅ Domain layer remains pure - no infrastructure dependencies
- ✅ Application layer will be responsible for adding metadata during persistence
- ✅ Created AuthContext and RequestContext classes in domain layer
- ✅ Updated EventStore interface to accept context parameters

## Migration Strategy (Production)
**Docker Compose Migration Service Approach:**
- Separate migration service runs before API startup
- Migration service uses same Docker image as API
- Runs `npm run migration:up` command
- API depends on successful migration completion
- Provides clear separation of concerns and observability

## Notes
- Single events table approach allows for later partitioning if needed
- Snapshotting can be added later without breaking the EventStore interface
- Event schema versioning is handled by the existing aggregateVersion field
- Global ordering is achieved through the auto-increment id field
- Implementation must be compatible with existing NestJS CQRS system
- Use string timestamps to maintain compatibility with existing DomainEvent interface
- Clean Architecture maintained: Domain → Application → Infrastructure dependency flow