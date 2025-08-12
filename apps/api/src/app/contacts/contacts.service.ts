import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterContactCommand, RegisterContactDto, GetAllContactsQuery, ContactReadModel, RecordMessageSentToContactCommand, RecordMessageSentToContactDto } from '@effectiv-crm/application';

@Injectable()
export class ContactsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async registerContact(dto: RegisterContactDto): Promise<void> {
    const command = new RegisterContactCommand(dto);
    await this.commandBus.execute(command);
  }

  async getAllContacts(): Promise<ContactReadModel[]> {
    const query = new GetAllContactsQuery();
    return await this.queryBus.execute(query);
  }

  async recordMessageSentToContact(dto: RecordMessageSentToContactDto): Promise<void> {
    const command = new RecordMessageSentToContactCommand(dto);
    await this.commandBus.execute(command);
  }
}
