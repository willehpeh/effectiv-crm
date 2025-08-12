import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegisterContactDto, ContactReadModel, RecordMessageSentToContactDto } from '@effectiv-crm/application';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('register')
  async registerContact(@Body() dto: RegisterContactDto): Promise<void> {
    await this.contactsService.registerContact(dto);
  }

  @Get()
  async getAllContacts(): Promise<ContactReadModel[]> {
    return await this.contactsService.getAllContacts();
  }

  @Post('message-sent')
  async recordMessageSentToContact(@Body() dto: RecordMessageSentToContactDto): Promise<void> {
    await this.contactsService.recordMessageSentToContact(dto);
  }
}
