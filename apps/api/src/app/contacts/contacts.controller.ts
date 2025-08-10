import { Controller, Post, Body } from '@nestjs/common';
import { RegisterContactDto } from '@effectiv-crm/application';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('register')
  async registerContact(@Body() dto: RegisterContactDto): Promise<void> {
    await this.contactsService.registerContact(dto);
  }
}
