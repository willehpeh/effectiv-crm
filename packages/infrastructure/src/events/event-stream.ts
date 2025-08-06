import { EventPublisher } from '@effectiv-crm/application';
import { DomainEvent } from '@effectiv-crm/domain';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { share } from 'rxjs/operators';

@Injectable()
export class EventStream implements EventPublisher {

  private readonly _eventStream$ = new Subject<DomainEvent>();
  private readonly _stream$ = this._eventStream$.asObservable().pipe(
    share()
  );

  publish(event: DomainEvent): void {
    this._eventStream$.next(event);
  }

  stream$(): Observable<DomainEvent> {
    return this._stream$;
  }
}
