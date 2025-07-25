import { ValueObject } from '../../common/value-object';
import { InvalidEmailError } from '../errors/invalid-email.error';

export class EmailAddress extends ValueObject<string> {

  private static EMAIL_REGEX = /^[a-zA-Z0-9.%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private constructor(value: string) {
    super(value);
  }

  static fromString(raw: string): EmailAddress {
    if (this.isInvalidEmailAddress(raw)) {
      throw new InvalidEmailError(raw);
    }
    return new EmailAddress(raw.toLowerCase());
  }

  private static isInvalidEmailAddress(raw: string) {
    return !this.EMAIL_REGEX.test(raw);
  }
}
