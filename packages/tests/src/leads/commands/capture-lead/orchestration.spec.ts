import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { CaptureLeadDtoFactory } from './capture-lead-dto.factory';

describe('Capture Lead - Orchestration', () => {
  let eventStore: FakeEventStore;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
  });

  it('records the newly captured lead', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    expect(eventStore.events[1].eventType).toBe('LeadCaptured');
  });
});
