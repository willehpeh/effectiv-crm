export interface DomainEvent {
  readonly aggregateId: string;
  readonly version: number;
  readonly eventType: string;
  readonly occurredOn: string;
  readonly payload: object;
}
