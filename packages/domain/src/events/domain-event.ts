export interface DomainEvent<T extends object> {
  readonly eventId: string;
  readonly aggregateId: string;
  readonly eventType: string;
  readonly occurredOn: Date;
  readonly payload: T;
}
