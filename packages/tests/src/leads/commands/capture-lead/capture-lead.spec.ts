import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler, CaptureLeadDto } from '@effectiv-crm/application';

describe('Capture Lead', () => {
  let dto: CaptureLeadDto;
  let command: CaptureLeadCommand;
  let handler: CaptureLeadCommandHandler;
  let eventStore: FakeEventStore;

  it('placeholder', () => {
    expect(true).toBe(true);
  });
});
