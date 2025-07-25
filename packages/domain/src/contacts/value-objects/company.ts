import { ValueObject } from '../../common/value-object';

export class Company extends ValueObject<string> {
  static fromString(value: string): Company {
    return new Company(value);
  }
}
