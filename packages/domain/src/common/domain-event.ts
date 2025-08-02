export interface DomainEvent {
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly eventType: string;
  readonly aggregateType: string;
  readonly occurredOn: string;
  readonly payload: object;
}
