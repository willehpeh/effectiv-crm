export interface RecordMessageSentToContactDto {
  contactId: string;
  subject: string;
  body?: string;
  sentAt: string;
  messageChannel: string;
  notes?: string;
}
