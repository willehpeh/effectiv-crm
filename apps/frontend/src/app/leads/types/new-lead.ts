export type NewLead = {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  source: string;
  contactDate: string;
  contactType: string;
  details: string;
  isReferral: boolean;
  referrer?: string;
}
