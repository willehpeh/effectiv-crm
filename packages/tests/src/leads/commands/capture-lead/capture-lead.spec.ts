import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { createDummyCaptureLeadDto } from './dummy-capture-lead.dto';
import { InvalidEmailError } from '@effectiv-crm/domain';

describe('Capture Lead', () => {
  let eventStore: FakeEventStore;

  beforeEach(() => {
    eventStore = new FakeEventStore();
  });

  it('should emit ContactRegistered event when capturing a lead', async () => {
    const dto = createDummyCaptureLeadDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    expect(eventStore.events[0].eventType).toBe('ContactRegistered');
  });

  it('should emit a LeadCaptured event when capturing a lead', async () => {
    const dto = createDummyCaptureLeadDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    expect(eventStore.events[1].eventType).toBe('LeadCaptured');
  });

  it('should throw error when capturing lead with invalid email', async () => {
    const dto = createDummyCaptureLeadDto();
    const invalidEmailDto = {
      ...dto,
      contactInfo: {
        ...dto.contactInfo,
        email: 'invalid-email'
      }
    };
    const command = new CaptureLeadCommand(invalidEmailDto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(InvalidEmailError);
  });
});
