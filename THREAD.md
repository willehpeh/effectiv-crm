# TDD Event Sourcing Implementation Thread

## Overview
Implemented Capture Lead functionality using strict TDD with event sourcing and Clean Architecture patterns.

## Key Implementation Steps

### 1. Test-First Approach
- Started with simple test: "should emit a LeadCaptured event when capturing a lead"
- Created dummy DTO factory for clean test data
- Built minimum implementation to make test pass

### 2. Event Structure Evolution
**Initial Decision**: Made version required and readonly in DomainEvent interface
**Key Architectural Questions Resolved**:
- **Event IDs**: Removed them - events identified by `aggregateId + version` combination
- **Version Management**: AggregateRoot automatically increments and assigns versions
- **Event Constructors**: Events set placeholder version (default 1), AggregateRoot overwrites with correct sequence

### 3. Domain Model Design
**Lead Aggregate**:
- Private constructor prevents direct instantiation
- `Lead.captureNew(payload)` static factory generates own UUID
- Extends AggregateRoot for version management and event application
- Raises LeadCapturedEvent through apply() method

**Final Event Structure**:
```typescript
interface DomainEvent {
  readonly aggregateId: string;
  readonly version: number;
  readonly eventType: string;
  readonly occurredOn: string;
  readonly payload: object;
}
```

### 4. Command Handler Pattern
```typescript
async execute(command: CaptureLeadCommand): Promise<any> {
  const lead = Lead.captureNew(command.dto);
  const events = lead.getUncommittedEvents();
  const leadId = lead.id().value();
  await this.eventStore.saveEvents(leadId, events);
  lead.markEventsAsCommitted();
}
```

## Final Architecture

### Domain Layer
- **AggregateRoot**: Manages version increments, event application, uncommitted events
- **Lead**: Business entity with factory method for creation
- **LeadCapturedEvent**: Domain event with aggregateId, version, eventType, occurredOn, payload
- **ValueObjects**: LeadId extends ValueObject<string>

### Application Layer  
- **CaptureLeadCommand**: Simple DTO wrapper
- **CaptureLeadCommandHandler**: Coordinates between domain and infrastructure
- **CaptureLeadDto**: Input data structure

### Testing
- **FakeEventStore**: Test double implementing EventStore interface
- **Dummy factories**: Clean test data generation
- **Behavioral testing**: Focus on events emitted, not implementation details

## Key Design Decisions

1. **Version Management**: AggregateRoot owns version sequencing
2. **Event Identity**: `aggregateId + version` sufficient for identification
3. **Aggregate Factories**: Aggregates generate their own IDs when created
4. **Event Constructors**: Simple with sensible defaults, version managed by infrastructure
5. **Clean Architecture**: Strict boundaries between domain, application, and infrastructure

## Test Output
✅ `should emit a LeadCaptured event when capturing a lead` - PASSING

The implementation successfully follows TDD principles while establishing a solid foundation for event-sourced domain modeling.
