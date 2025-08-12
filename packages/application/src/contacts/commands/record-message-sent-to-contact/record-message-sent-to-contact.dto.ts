export interface RecordMessageSentToContactDto {
  contactId: string;
  subject: string;
  body?: string;
  sentAt: Date;
  messageChannel: string;
  notes?: string;
}
