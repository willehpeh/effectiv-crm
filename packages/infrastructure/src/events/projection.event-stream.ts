import { Injectable } from '@nestjs/common';
import { EventStream } from './event-stream';
import { from, merge, Observable, Subject, switchMap, tap } from 'rxjs';
import { share } from 'rxjs/operators';
import { DomainEvent, EventStore } from '@effectiv-crm/domain';

@Injectable()
export class ProjectionEventStream {

  private readonly _rebuilder$ = new Subject<DomainEvent[]>();
  private readonly _rebuildEvents$ = this._rebuilder$.asObservable().pipe(
    share()
  );

  constructor(private readonly eventStream$: EventStream,
              private readonly eventStore: EventStore) {
  }

  stream$(): Observable<DomainEvent> {
    return merge(
      this.eventStream$.stream$(),
      this._rebuildEvents$.pipe(
        switchMap(events => from(events))
      )
    ).pipe(
      share()
    );
  }

  rebuildAll(): void {
    from(this.eventStore.allEvents()).pipe(
      tap(events => this._rebuilder$.next(events))
    ).subscribe();
  }

}
