import { ValueObject } from '../../common/value-object';
import { EmptyNameError } from '../../leads/errors/empty-name.error';

export class LastName extends ValueObject<string> {

  static fromString(value: string): LastName {
    const trimmedValue = value.trim();
    if (this.nameIsEmpty(trimmedValue)) {
      throw new EmptyNameError();
    }
    return new LastName(trimmedValue);
  }

  private static nameIsEmpty(value: string) {
    return value === '';
  }
}
