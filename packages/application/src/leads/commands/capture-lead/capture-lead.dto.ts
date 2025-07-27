export type CaptureLeadDto = {
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
  },
  leadDetails: {
    source: string,
    contactDate: string,
    contactType: string,
    referrer?: string,
    details: string
  }
};
