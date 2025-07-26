import { ValueObject } from '../../common/value-object';

export class LeadSource extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static fromString(value: string): LeadSource {
    return new LeadSource(value);
  }
}
