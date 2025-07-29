import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { 
  AuthContext, 
  RequestContext, 
  EventStore, 
  LeadCapturedEvent 
} from '@effectiv-crm/domain';
import { MikroOrmEventStore, EventEntity } from '@effectiv-crm/infrastructure';

describe('MikroOrmEventStore Integration', () => {
  let container: StartedPostgreSqlContainer;
  let eventStore: EventStore;
  let module: TestingModule;

  beforeAll(async () => {
    // Start PostgreSQL container
    container = await new PostgreSqlContainer('postgres:16')
      .withDatabase('test_db')
      .withUsername('test_user')
      .withPassword('test_password')
      .start();

    // Create test module
    module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          driver: PostgreSqlDriver,
          host: container.getHost(),
          port: container.getPort(),
          user: container.getUsername(),
          password: container.getPassword(),
          dbName: container.getDatabase(),
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

    // Create tables
    const orm = module.get<MikroORM>(MikroORM);
    try {
      await orm.getSchemaGenerator().dropSchema();
    } catch {
      // Ignore if schema doesn't exist
    }
    await orm.getSchemaGenerator().createSchema();
  });

  afterAll(async () => {
    await module?.close();
    await container?.stop();
  });

  it('should save and retrieve events', async () => {
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
});
