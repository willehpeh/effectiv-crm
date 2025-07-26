import { ValueObject } from '../../common/value-object';
import { EmptyNameError } from '../../leads/errors/empty-name.error';

export class LastName extends ValueObject<string> {

  static fromString(value: string): LastName {
    if (this.nameIsEmpty(value)) {
      throw new EmptyNameError();
    }
    return new LastName(value);
  }

  private static nameIsEmpty(value: string) {
    return value.trim() === '';
  }
}
