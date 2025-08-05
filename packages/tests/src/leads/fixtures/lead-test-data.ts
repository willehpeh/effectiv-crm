import { LeadCapturedEvent, DomainEvent } from '@effectiv-crm/domain';

export const leadTestData = {
  contacts: {
    johnDoe: {
      id: 'contact-123',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    contact1: {
      id: 'contact-1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    contact2: {
      id: 'contact-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    }
  },

  leads: {
    lead456: {
      id: 'lead-456',
      contactId: 'contact-123',
      source: 'website',
      contactDate: '2024-01-15T10:00:00Z',
      details: 'Interested in premium package'
    },
    lead1: {
      id: 'lead-1',
      contactId: 'contact-1',
      source: 'website',
      contactDate: '2024-01-15T10:00:00Z',
      details: 'First lead'
    },
    lead2: {
      id: 'lead-2',
      contactId: 'contact-2',
      source: 'referral',
      contactDate: '2024-01-16T11:00:00Z',
      details: 'Second lead'
    }
  },

  nonexistentContactId: 'nonexistent-contact'
};

export const leadEvents = {
  lead456Captured: () => new LeadCapturedEvent(leadTestData.leads.lead456.id, {
    contactId: leadTestData.leads.lead456.contactId,
    source: leadTestData.leads.lead456.source,
    contactDate: leadTestData.leads.lead456.contactDate,
    details: leadTestData.leads.lead456.details
  }),

  lead1Captured: () => new LeadCapturedEvent(leadTestData.leads.lead1.id, {
    contactId: leadTestData.leads.lead1.contactId,
    source: leadTestData.leads.lead1.source,
    contactDate: leadTestData.leads.lead1.contactDate,
    details: leadTestData.leads.lead1.details
  }),

  lead2Captured: () => new LeadCapturedEvent(leadTestData.leads.lead2.id, {
    contactId: leadTestData.leads.lead2.contactId,
    source: leadTestData.leads.lead2.source,
    contactDate: leadTestData.leads.lead2.contactDate,
    details: leadTestData.leads.lead2.details
  }),

  nonexistentContactLead: () => new LeadCapturedEvent(leadTestData.leads.lead456.id, {
    contactId: leadTestData.nonexistentContactId,
    source: leadTestData.leads.lead456.source,
    contactDate: leadTestData.leads.lead456.contactDate,
    details: leadTestData.leads.lead456.details
  }),

  nonLeadEvent: (): DomainEvent => ({
    aggregateId: 'contact-1',
    aggregateVersion: 1,
    eventType: 'ContactRegistered',
    aggregateType: 'Contact',
    occurredOn: new Date().toISOString(),
    payload: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }
  })
};

export const expectedLeadProjections = {
  lead456: {
    id: 'lead-456',
    contactId: 'contact-123',
    contactName: 'John Doe',
    contactEmail: 'john.doe@example.com',
    source: 'website',
    capturedAt: '2024-01-15T10:00:00Z'
  },

  lead1: {
    id: 'lead-1',
    contactId: 'contact-1',
    contactName: 'John Doe',
    contactEmail: 'john.doe@example.com',
    source: 'website',
    capturedAt: '2024-01-15T10:00:00Z'
  },

  lead2: {
    id: 'lead-2',
    contactId: 'contact-2',
    contactName: 'Jane Smith',
    contactEmail: 'jane.smith@example.com',
    source: 'referral',
    capturedAt: '2024-01-16T11:00:00Z'
  }
};
