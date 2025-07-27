export class InvalidContactDateError extends Error {
  constructor(value: string) {
    super(`Invalid contact date format: ${value}. Expected format: YYYY-MM-DD`);
  }
}
