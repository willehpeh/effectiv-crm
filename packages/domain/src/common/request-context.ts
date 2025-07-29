export class RequestContext {
  constructor(private readonly _correlationId: string) {}

  correlationId(): string {
    return this._correlationId;
  }
}
