import { ValueObject } from '../../common/value-object';
import { InvalidContactDateError } from '../errors/invalid-contact-date.error';

export class ContactDate extends ValueObject<string> {
  static fromString(value: string): ContactDate {
    if (!this.isValid(value)) {
      throw new InvalidContactDateError(value);
    }

    return new ContactDate(value);
  }

  private static isValid(value: string): boolean {
    return this.isValidDate(value) && this.isNotInFuture(value);
  }

  private static isValidDate(value: string): boolean {
    // try/catch here ensures InvalidContactDateError is returned and not RangeError
    try {
      return new Date(value).toISOString().split('T')[0] === value;
    } catch {
      return false;
    }
  }

  private static isNotInFuture(value: string): boolean {
    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate <= today;
  }
}
