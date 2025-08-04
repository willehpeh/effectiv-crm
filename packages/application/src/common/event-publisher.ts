export interface EventPublisher {
  publish(eventType: string, payload: unknown): Promise<void>;
}
