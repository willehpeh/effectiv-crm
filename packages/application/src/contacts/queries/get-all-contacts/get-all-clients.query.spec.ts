import { GetAllClientsQueryHandler } from './get-all-clients.handler';
import { GetAllClientsQuery } from './get-all-clients.query';
import { ContactProjection } from '../../projections/contact.projection';
import { ContactReadModel } from '../../read-models/contact.read-model';

class FakeContactProjection extends ContactProjection {
  private contacts: ContactReadModel[] = [];

  contactById(contactId: string): ContactReadModel | undefined {
    return this.contacts.find(contact => contact.id === contactId);
  }

  addContact(contact: ContactReadModel): void {
    this.contacts.push(contact);
  }

  getAllContacts(): ContactReadModel[] {
    return [...this.contacts];
  }
}

describe('GetAllClientsQueryHandler', () => {
  let handler: GetAllClientsQueryHandler;
  let projection: FakeContactProjection;

  beforeEach(() => {
    projection = new FakeContactProjection();
    handler = new GetAllClientsQueryHandler(projection);
  });

  it('should return all clients', async () => {
    // Arrange
    const client1: ContactReadModel = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    };
    const client2: ContactReadModel = {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    };
    
    projection.addContact(client1);
    projection.addContact(client2);

    const query = new GetAllClientsQuery();

    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(client1);
    expect(result).toContainEqual(client2);
  });

  it('should return empty array when no clients exist', async () => {
    // Arrange
    const query = new GetAllClientsQuery();

    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toEqual([]);
  });
});
