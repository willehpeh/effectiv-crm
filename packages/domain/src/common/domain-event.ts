export interface DomainEvent {
  readonly eventId: string;
  readonly aggregateId: string;
  readonly version: number;
  readonly eventType: string;
  readonly occurredOn: string;
  readonly payload: object;
}
