export class MissingReferrerError extends Error {
  constructor() {
    super('Referrer is required when lead source is referral');
  }
}
