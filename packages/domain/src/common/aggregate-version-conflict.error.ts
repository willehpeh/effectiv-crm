export class AggregateVersionConflictError extends Error {
  constructor(
    public readonly aggregateId: string,
    public readonly expectedVersion: number,
    public readonly actualVersion: number
  ) {
    super(
      `Aggregate version conflict for aggregate ${aggregateId}. Expected version ${expectedVersion}, but actual version is ${actualVersion}.`
    );
    this.name = 'AggregateVersionConflictError';
  }
}
