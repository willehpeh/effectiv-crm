# PostgreSQL Event Store Implementation Plan

## Overview
Implement a PostgreSQL-based event store in the infrastructure package using MikroORM, with support for event metadata containing ownerId and correlationId. This implementation must align with the existing Clean Architecture and NestJS CQRS setup.

## 1. Docker Compose Configuration
- Update existing docker-compose.yaml to add PostgreSQL service
- Use PostgreSQL 16 (latest stable version)
- Configure database: `effectiv_crm`, user: `effectiv_user`, password via environment
- Set connection pool size to 10
- Add health check with pg_isready
- Expose port 5432 for development
- Add volume for data persistence

## 2. Dependencies and MikroORM Setup
- Add to package.json dependencies:
  - @mikro-orm/core
  - @mikro-orm/postgresql
  - @mikro-orm/migrations
  - @mikro-orm/nestjs (for NestJS integration)
- Create MikroORM configuration in infrastructure package
- Set up entity discovery and migrations paths
- Configure JSONB type mapping for PostgreSQL
- Configure connection pooling (10 connections)

## 3. Event Entity Implementation
Create Event entity with the following fields:
- **id** (bigint, primary key, auto-increment) - serves as global sequence
- **aggregateId** (string, indexed)
- **aggregateVersion** (number)
- **eventType** (string)
- **occurredOn** (string) - ISO 8601 timestamp string to match existing DomainEvent interface
- **payload** (JSONB)
- **metadata** (JSONB) - structured as EventMetadata interface:
  ```typescript
  interface EventMetadata {
    ownerId: string;
    correlationId: string;
  }
  ```

Constraints and indexes:
- Composite unique constraint on (aggregateId, aggregateVersion) for optimistic locking
- Index on aggregateId for query performance
- Index on eventType if needed for future projections

## 4. PostgreSQL Event Store Implementation
- Implement EventStore abstract class from domain package
- Implement saveEvents method:
  - Validate event versions for optimistic locking
  - Batch insert events using MikroORM EntityManager
  - Handle version conflicts appropriately
- Implement getEventsForAggregate method:
  - Query by aggregateId
  - Order by id (global sequence)
  - Deserialize JSONB payload and metadata
  - Map back to DomainEvent interface
- Handle serialization/deserialization of domain events
- Implement proper error handling (propagate errors, no circuit breaker initially)

## 5. NestJS Integration
- Create EventStoreModule in infrastructure package
- Register MikroORM module with PostgreSQL configuration
- Register PostgreSQL EventStore as provider implementing EventStore abstract class
- Export EventStore for use in application layer
- Configure for both development and production environments

## 6. Database Migrations
- Create initial migration for events table
- Set up migration commands in package.json:
  - migration:create
  - migration:up
  - migration:down
- Ensure migrations run on application startup in development

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

## 9. Existing Event Updates
- Update existing domain events (e.g., LeadCapturedEvent) to support metadata
- Add EventMetadata interface to domain package
- Ensure backward compatibility with events that don't have metadata
- Update event constructors to optionally accept metadata

## Notes
- Single events table approach allows for later partitioning if needed
- Snapshotting can be added later without breaking the EventStore interface
- Event schema versioning is handled by the existing aggregateVersion field
- Global ordering is achieved through the auto-increment id field
- Implementation must be compatible with existing NestJS CQRS system
- Use string timestamps to maintain compatibility with existing DomainEvent interface