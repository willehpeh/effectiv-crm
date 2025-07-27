import { ValueObject } from '../../common/value-object';

export class ContactDate extends ValueObject<string> {
  static fromString(value: string): ContactDate {
    return new ContactDate(value);
  }
}
