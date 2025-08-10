import { ValueObject } from '../../common/value-object';
import { InvalidEmailError } from '../errors/invalid-email.error';

export class EmailAddress extends ValueObject<string> {

  static fromString(email: string): EmailAddress {
    if (!this.isValidEmail(email)) {
      throw new InvalidEmailError();
    }
    return new EmailAddress(email);
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
