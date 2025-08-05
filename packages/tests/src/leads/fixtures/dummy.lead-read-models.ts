import { LeadReadModel } from '@effectiv-crm/application';

export const dummyLeads: LeadReadModel[] = [
  {
    id: '1',
    contactId: 'contact-1',
    contactName: 'John Doe',
    contactEmail: 'john.doe@example.com',
    source: 'website',
    capturedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: '2',
    contactId: 'contact-2',
    contactName: 'Jane Smith',
    contactEmail: 'jane.smith@businessco.com',
    source: 'referral',
    capturedAt: '2025-01-10T14:30:00Z'
  },
  {
    id: '3',
    contactId: 'contact-3',
    contactName: 'Bob Johnson',
    contactEmail: 'bob.johnson@startup.io',
    source: 'trade_show',
    capturedAt: '2025-01-05T09:15:00Z'
  },
  {
    id: '4',
    contactId: 'contact-4',
    contactName: 'Alice Brown',
    contactEmail: 'alice.brown@consulting.com',
    source: 'website',
    capturedAt: '2025-01-20T11:45:00Z'
  },
  {
    id: '5',
    contactId: 'contact-5',
    contactName: 'Charlie Wilson',
    contactEmail: 'charlie.wilson@enterprise.org',
    source: 'email_campaign',
    capturedAt: '2024-12-28T16:20:00Z'
  }
];
