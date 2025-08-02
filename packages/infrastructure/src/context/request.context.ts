import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST
})
export class RequestContext {
  private _correlationId?: string;

  setCorrelationId(correlationId: string) {
    this._correlationId = correlationId;
  }

  correlationId(): string {
    if (!this._correlationId) {
      throw new Error('Correlation id is not set');
    }
    return this._correlationId;
  }
}
