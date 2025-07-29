import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { 
  AuthContext, 
  RequestContext, 
  EventStore, 
  LeadCapturedEvent 
} from '@effectiv-crm/domain';
import { MikroOrmEventStore, EventEntity } from '@effectiv-crm/infrastructure';

describe('MikroOrmEventStore SQLite Integration', () => {
  let eventStore: EventStore;
  let module: TestingModule;

  beforeAll(async () => {
    // Create test module with in-memory SQLite
    module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          driver: SqliteDriver,
          dbName: ':memory:',
          entities: [EventEntity],
          debug: false,
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature([EventEntity]),
      ],
      providers: [
        {
          provide: EventStore,
          useClass: MikroOrmEventStore,
        },
      ],
    }).compile();

    eventStore = module.get<EventStore>(EventStore);

    // Create tables - SQLite with synchronize should handle this automatically
    const orm = module.get<MikroORM>(MikroORM);
    await orm.getSchemaGenerator().createSchema();
  });

  afterAll(async () => {
    await module?.close();
  });

  it('should save and retrieve events with SQLite', async () => {
    // Arrange
    const authContext = new AuthContext('user-123');
    const requestContext = new RequestContext('correlation-456');
    
    const aggregateId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'; // Valid UUID
    const event = new LeadCapturedEvent(
      aggregateId,
      {
        contactId: 'test@example.com',
        source: 'WEBSITE',
        contactDate: new Date().toISOString(),
        details: 'Test lead details',
        referrer: 'example.com'
      },
      1
    );

    // Act
    await eventStore.saveEvents([event], authContext, requestContext);
    const retrievedEvents = await eventStore.getEventsForAggregate(aggregateId);

    // Assert
    expect(retrievedEvents).toHaveLength(1);
    expect(retrievedEvents[0].aggregateId).toBe(aggregateId);
    expect(retrievedEvents[0].aggregateVersion).toBe(1);
    expect(retrievedEvents[0].eventType).toBe('LeadCaptured');
  });

  it('should handle multiple events with different aggregate IDs', async () => {
    // Arrange
    const authContext = new AuthContext('user-456');
    const requestContext = new RequestContext('correlation-789');
    
    const aggregateId1 = 'f47ac10b-58cc-4372-a567-0e02b2c3d480';
    const aggregateId2 = 'f47ac10b-58cc-4372-a567-0e02b2c3d481';
    
    const event1 = new LeadCapturedEvent(aggregateId1, {
      contactId: 'test1@example.com',
      source: 'WEBSITE',
      contactDate: new Date().toISOString(),
      details: 'First lead',
    }, 1);
    
    const event2 = new LeadCapturedEvent(aggregateId2, {
      contactId: 'test2@example.com',
      source: 'EMAIL',
      contactDate: new Date().toISOString(),
      details: 'Second lead',
    }, 1);

    // Act
    await eventStore.saveEvents([event1, event2], authContext, requestContext);
    
    const events1 = await eventStore.getEventsForAggregate(aggregateId1);
    const events2 = await eventStore.getEventsForAggregate(aggregateId2);

    // Assert
    expect(events1).toHaveLength(1);
    expect(events2).toHaveLength(1);
    expect(events1[0].aggregateId).toBe(aggregateId1);
    expect(events2[0].aggregateId).toBe(aggregateId2);
  });
});
