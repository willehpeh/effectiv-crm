import { ValueObject } from '../../common/value-object';
import { EmptyNameError } from '../../leads/errors/empty-name.error';

export class FirstName extends ValueObject<string> {

  static fromString(value: string): FirstName {
    if (this.nameIsEmpty(value)) {
      throw new EmptyNameError();
    }
    return new FirstName(value);
  }

  private static nameIsEmpty(value: string) {
    return value.trim() === '';
  }
}
