import { RecordMessageSentToContactDto } from './record-message-sent-to-contact.dto';

export class RecordMessageSentToContactCommand {
  constructor(public dto: RecordMessageSentToContactDto) {
  }
}
