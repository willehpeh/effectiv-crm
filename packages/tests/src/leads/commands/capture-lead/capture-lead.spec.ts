import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { createDummyCaptureLeadDto } from './dummy-capture-lead.dto';

describe('Capture Lead', () => {
  let eventStore: FakeEventStore;

  beforeEach(() => {
    eventStore = new FakeEventStore();
  });

  it('should emit a LeadCaptured event when capturing a lead', async () => {
    const dto = createDummyCaptureLeadDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    expect(eventStore.events).toHaveLength(1);
    expect(eventStore.events[0].eventType).toBe('LeadCaptured');
  });
});
