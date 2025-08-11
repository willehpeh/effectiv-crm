export interface RecordEmailSentToContactDto {
  contactId: string;
  subject: string;
  body?: string;
  sentAt: Date;
  senderEmail: string;
  notes?: string;
}
