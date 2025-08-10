import { RegisterContactDto } from '@effectiv-crm/application';

export class RegisterContactDtoFactory {
  validDto(): RegisterContactDto {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      company: 'Example Corp'
    };
  }

  withNoCompany(): RegisterContactDto {
    const dto = this.validDto();
    dto.company = undefined;
    return dto;
  }

  withFirstName(firstName: string): RegisterContactDto {
    const dto = this.validDto();
    dto.firstName = firstName;
    return dto;
  }

  withLastName(lastName: string): RegisterContactDto {
    const dto = this.validDto();
    dto.lastName = lastName;
    return dto;
  }

  withEmail(email: string): RegisterContactDto {
    const dto = this.validDto();
    dto.email = email;
    return dto;
  }
}
