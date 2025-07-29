import { DomainEvent } from './domain-event';
import { AuthContext } from './auth-context';
import { RequestContext } from './request-context';

export abstract class EventStore {
  abstract saveEvents(events: DomainEvent[], authContext: AuthContext, requestContext: RequestContext): Promise<void>;

  abstract getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]>;
}
