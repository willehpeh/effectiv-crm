import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadDtoFactory } from './capture-lead-dto.factory';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { LeadCapturedEvent } from '@effectiv-crm/domain';

describe('Capture Lead - Lead Details', () => {
  let eventStore: FakeEventStore;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
  });

  it.each([
    'website',
    'social-media'
  ])('should save the lead source when it is valid', async (source) => {
    const dto = dtoFactory.withSource(source);
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const leadCapturedEvent = eventStore.events[1] as LeadCapturedEvent;
    expect(leadCapturedEvent.payload.source).toBe(source);
  });
});
