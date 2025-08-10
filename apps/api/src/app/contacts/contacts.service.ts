import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterContactCommand, RegisterContactDto } from '@effectiv-crm/application';

@Injectable()
export class ContactsService {
  constructor(private readonly commandBus: CommandBus) {}

  async registerContact(dto: RegisterContactDto): Promise<void> {
    const command = new RegisterContactCommand(dto);
    await this.commandBus.execute(command);
  }
}
