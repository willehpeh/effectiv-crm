import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { ContactsController } from '../../../../../apps/api/src/app/contacts/contacts.controller';
import { ContactsService } from '../../../../../apps/api/src/app/contacts/contacts.service';
import { ContactProjection, GetAllContactsQueryHandler, ContactReadModel } from '@effectiv-crm/application';

class FakeContactProjection extends ContactProjection {
  private contacts: ContactReadModel[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  ];

  contactById(contactId: string): ContactReadModel | undefined {
    return this.contacts.find(contact => contact.id === contactId);
  }

  getAllContacts(): ContactReadModel[] {
    return [...this.contacts];
  }
}

describe('ContactsController - GET /contacts', () => {
  let app: TestingModule;
  let controller: ContactsController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [ContactsController],
      providers: [
        ContactsService,
        GetAllContactsQueryHandler,
        {
          provide: ContactProjection,
          useClass: FakeContactProjection,
        },
      ],
    }).compile();

    await app.init();
    controller = app.get<ContactsController>(ContactsController);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return all contacts', async () => {
    // Act
    const result = await controller.getAllContacts();

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(result[1]).toEqual({
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    });
  });
});
