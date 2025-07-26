import { ValueObject } from '../../common/value-object';
import { EmptyNameError } from '../../leads/errors/empty-name.error';

export class FirstName extends ValueObject<string> {

  static fromString(value: string): FirstName {
    const trimmedValue = value.trim();
    if (this.nameIsEmpty(trimmedValue)) {
      throw new EmptyNameError();
    }
    return new FirstName(trimmedValue);
  }

  private static nameIsEmpty(value: string) {
    return value === '';
  }
}
