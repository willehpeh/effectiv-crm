import { CaptureLeadDto } from '@effectiv-crm/application';

export const dummyCaptureLeadDto: CaptureLeadDto = {
  contactInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Corp'
  },
  leadDetails: {
    source: 'Website',
    contactDate: '2025-01-15',
    contactType: 'Online Form',
    referral: false,
    details: 'Interested in premium package'
  }
};
