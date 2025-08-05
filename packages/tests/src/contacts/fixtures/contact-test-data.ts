import { ContactRegisteredEvent, DomainEvent } from '@effectiv-crm/domain';

export const contactTestData = {
  johnDoe: {
    id: 'contact-123',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme Corp'
  },

  janeDoe: {
    id: 'contact-1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme Corp'
  },

  janeSmith: {
    id: 'contact-2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    company: 'Tech Inc'
  },

  existingContact: {
    id: 'existing-123',
    name: 'Existing Contact',
    email: 'existing@example.com'
  }
};

export const contactEvents = {
  johnDoeRegistered: () => new ContactRegisteredEvent(contactTestData.johnDoe.id, {
    email: contactTestData.johnDoe.email,
    firstName: contactTestData.johnDoe.firstName,
    lastName: contactTestData.johnDoe.lastName,
    company: contactTestData.johnDoe.company
  }),

  janeDoeRegistered: () => new ContactRegisteredEvent(contactTestData.janeDoe.id, {
    email: contactTestData.janeDoe.email,
    firstName: contactTestData.janeDoe.firstName,
    lastName: contactTestData.janeDoe.lastName,
    company: contactTestData.janeDoe.company
  }),

  janeSmithRegistered: () => new ContactRegisteredEvent(contactTestData.janeSmith.id, {
    email: contactTestData.janeSmith.email,
    firstName: contactTestData.janeSmith.firstName,
    lastName: contactTestData.janeSmith.lastName,
    company: contactTestData.janeSmith.company
  }),

  nonContactEvent: (): DomainEvent => ({
    aggregateId: 'lead-1',
    aggregateVersion: 1,
    eventType: 'LeadCaptured',
    aggregateType: 'Lead',
    occurredOn: new Date().toISOString(),
    payload: { contactId: 'contact-1', source: 'Website' }
  })
};

export const expectedContactProjections = {
  johnDoe: {
    id: 'contact-123',
    name: 'John Doe',
    email: 'john.doe@example.com'
  },

  janeDoe: {
    id: 'contact-1',
    name: 'John Doe',
    email: 'john.doe@example.com'
  },

  janeSmith: {
    id: 'contact-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com'
  }
};
