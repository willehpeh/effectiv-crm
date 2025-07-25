import { ValueObject } from '../../common/value-object';

export class FirstName extends ValueObject<string> {
  static fromString(value: string): FirstName {
    return new FirstName(value);
  }
}
