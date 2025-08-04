import { LeadReadModel } from './lead-read-model';
import { GetAllLeadsQuery } from './get-all-leads-query';

export class GetAllLeadsQueryHandler {
  async execute(query: GetAllLeadsQuery): Promise<LeadReadModel[]> {
    // TODO: Implement with projection
    return [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        company: 'TechCorp Inc.',
        status: 'new',
        lastContacted: '2025-01-15',
        details: 'Interested in enterprise solutions'
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@businessco.com',
        company: 'BusinessCo',
        status: 'contacted',
        lastContacted: '2025-01-10',
        details: 'Looking for pricing information'
      },
      {
        id: '3',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@startup.io',
        company: 'StartupIO',
        status: 'qualified',
        lastContacted: '2025-01-05',
        details: 'Ready to schedule demo'
      },
      {
        id: '4',
        firstName: 'Alice',
        lastName: 'Brown',
        email: 'alice.brown@consulting.com',
        status: 'new',
        lastContacted: '2025-01-20',
        details: 'Consultant interested in our services'
      },
      {
        id: '5',
        firstName: 'Charlie',
        lastName: 'Wilson',
        email: 'charlie.wilson@enterprise.org',
        company: 'Enterprise Solutions Ltd',
        status: 'proposal_sent',
        lastContacted: '2024-12-28',
        details: 'Proposal sent, awaiting response'
      }
    ];
  }
}
