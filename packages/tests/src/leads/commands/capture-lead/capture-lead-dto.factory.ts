import { CaptureLeadDto } from '@effectiv-crm/application';

export class CaptureLeadDtoFactory {
  validDto(): CaptureLeadDto {
    return {
      contactInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        company: 'Example Corp'
      },
      leadDetails: {
        source: 'website',
        contactDate: '2025-01-15',
        contactType: 'Online Form',
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

  withFirstName(firstName: string): CaptureLeadDto {
    const dto = this.validDto();
    dto.contactInfo.firstName = firstName;

    return dto;
  }

  withLastName(lastName: string): CaptureLeadDto {
    const dto = this.validDto();
    dto.contactInfo.lastName = lastName;

    return dto;
  }

  withSource(source: string): CaptureLeadDto {
    const dto = this.validDto();
    dto.leadDetails.source = source;

    return dto;
  }

  withContactDate(date: string): CaptureLeadDto {
    const dto = this.validDto();
    dto.leadDetails.contactDate = date;

    return dto;
  }
}
