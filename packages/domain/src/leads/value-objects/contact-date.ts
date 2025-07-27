import { ValueObject } from '../../common/value-object';
import { InvalidContactDateError } from '../errors/invalid-contact-date.error';

export class ContactDate extends ValueObject<string> {
  static fromString(value: string): ContactDate {
    if (this.invalidDateStringFormat(value)) {
      throw new InvalidContactDateError(value);
    }
    return new ContactDate(value);
  }

  private static invalidDateStringFormat(value: string) {
    return !/^\d{4}-\d{2}-\d{2}$/.test(value);
  }
}
