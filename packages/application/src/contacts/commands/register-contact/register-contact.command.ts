import { RegisterContactDto } from './register-contact.dto';

export class RegisterContactCommand {
  constructor(public dto: RegisterContactDto) {
  }
}
