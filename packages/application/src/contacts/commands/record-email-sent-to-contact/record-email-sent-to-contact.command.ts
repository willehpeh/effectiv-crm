import { RecordEmailSentToContactDto } from './record-email-sent-to-contact.dto';

export class RecordEmailSentToContactCommand {
  constructor(public dto: RecordEmailSentToContactDto) {
  }
}
