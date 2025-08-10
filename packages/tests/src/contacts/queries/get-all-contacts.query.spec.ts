import { GetAllContactsQueryHandler } from '@effectiv-crm/application';
import { GetAllContactsQuery } from '@effectiv-crm/application';
import { ContactProjection } from '@effectiv-crm/application';
import { ContactReadModel } from '@effectiv-crm/application';

class FakeContactProjection extends ContactProjection {
  private contacts: ContactReadModel[] = [];

  contactById(contactId: string): ContactReadModel | undefined {
    return this.contacts.find(contact => contact.id === contactId);
  }

  getAllContacts(): ContactReadModel[] {
    return [...this.contacts];
  }

  addContact(contact: ContactReadModel): void {
    this.contacts.push(contact);
  }
}

describe('GetAllContactsQueryHandler', () => {
  let handler: GetAllContactsQueryHandler;
  let projection: FakeContactProjection;

  beforeEach(() => {
    projection = new FakeContactProjection();
    handler = new GetAllContactsQueryHandler(projection);
  });

  it('should return all contacts', async () => {
    // Arrange
    const contact1: ContactReadModel = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp'
    };
    const contact2: ContactReadModel = {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    };
    
    projection.addContact(contact1);
    projection.addContact(contact2);

    const query = new GetAllContactsQuery();

    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(contact1);
    expect(result).toContainEqual(contact2);
  });

  it('should return empty array when no contacts exist', async () => {
    // Arrange
    const query = new GetAllContactsQuery();

    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toEqual([]);
  });
});
