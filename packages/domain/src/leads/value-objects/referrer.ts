import { ValueObject } from '../../common/value-object';

export class Referrer extends ValueObject<string> {
  static fromString(value: string | undefined): Referrer {
    return new Referrer(value ?? '');
  }

  isEmpty(): boolean {
    return this.value() === '';
  }
}
