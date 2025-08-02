import { Entity, PrimaryKey, Property, Index, Unique } from '@mikro-orm/core';
import { EventMetadata } from '../event-metadata';

@Entity({ tableName: 'events' })
@Unique({ properties: ['aggregateId', 'aggregateVersion'] })
@Index({ properties: ['aggregateId'] })
@Index({ properties: ['eventType'] })
@Index({ properties: ['aggregateType'] })
export class EventEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: string;

  @Property({ type: 'uuid' })
  aggregateId!: string;

  @Property({ type: 'integer' })
  aggregateVersion!: number;

  @Property({ type: 'varchar', length: 255 })
  eventType!: string;

  @Property({ type: 'varchar', length: 100 })
  aggregateType!: string;

  @Property({ type: 'varchar', length: 30 })
  occurredOn!: string;

  @Property({ type: 'jsonb' })
  payload!: object;

  @Property({ type: 'jsonb' })
  metadata!: EventMetadata;

  constructor(
    aggregateId: string,
    aggregateVersion: number,
    eventType: string,
    aggregateType: string,
    occurredOn: string,
    payload: object,
    metadata: EventMetadata
  ) {
    this.aggregateId = aggregateId;
    this.aggregateVersion = aggregateVersion;
    this.eventType = eventType;
    this.aggregateType = aggregateType;
    this.occurredOn = occurredOn;
    this.payload = payload;
    this.metadata = metadata;
  }
}
