import { ValueObject } from '../../common/value-object';

export class LastName extends ValueObject<string> {
  static fromString(value: string): LastName {
    return new LastName(value);
  }
}
