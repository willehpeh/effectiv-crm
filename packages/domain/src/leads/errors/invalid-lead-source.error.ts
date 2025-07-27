export class InvalidLeadSourceError extends Error {
  constructor(value: string) {
    super(`Invalid lead source: ${ value }`);
  }
}
