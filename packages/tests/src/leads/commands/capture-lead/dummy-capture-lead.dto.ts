import { CaptureLeadDto } from '@effectiv-crm/application';

export class DummyCaptureLeadDtoFactory {
  validDto(): CaptureLeadDto {
    return {
      contactInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        company: 'Example Corp'
      },
      leadDetails: {
        source: 'Website',
        contactDate: '2025-01-15',
        contactType: 'Online Form',
        referral: false,
        details: 'Interested in premium package'
      }
    };
  }

  withInvalidEmail(): CaptureLeadDto {
    const dto = this.validDto();
    dto.contactInfo.email = 'Invalid email';

    return dto;
  }

  withNoCompany(): CaptureLeadDto {
    const dto = this.validDto();
    dto.contactInfo.company = undefined;

    return dto;
  }
}
