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
    return this.hasValidFormat(value) && this.hasValidMonth(value);
  }

  private static hasValidFormat(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  private static hasValidMonth(value: string): boolean {
    const month = parseInt(value.split('-')[1], 10);
    return month >= 1 && month <= 12;
  }
}
