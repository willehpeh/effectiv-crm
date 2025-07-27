import { ValueObject } from '../../common/value-object';
import { InvalidLeadSourceError } from '../errors/invalid-lead-source.error';



export class LeadSource extends ValueObject<ValidLeadSource> {

  private constructor(value: string) {
    if (!isValidLeadSource(value)) {
      throw new InvalidLeadSourceError(value);
    }
    super(value);
  }

  static fromString(value: string): LeadSource {
    return new LeadSource(value);
  }
}

const VALID_LEAD_SOURCES = [
  'website',
  'social-media',
  'referral',
  'email-campaign',
  'cold-call'
] as const;

type ValidLeadSource = typeof VALID_LEAD_SOURCES[number];

function isValidLeadSource(value: string): value is ValidLeadSource {
  return VALID_LEAD_SOURCES.includes(value as ValidLeadSource);
}
