import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { createDummyCaptureLeadDto } from './dummy-capture-lead.dto';
import { ContactRegisteredEvent, InvalidEmailError } from '@effectiv-crm/domain';

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

  it('should emit ContactRegistered event with correct firstName in payload', async () => {
    const dto = createDummyCaptureLeadDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.firstName).toBe(dto.contactInfo.firstName);
  });

  it('should emit ContactRegistered event with correct lastName in payload', async () => {
    const dto = createDummyCaptureLeadDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.lastName).toBe(dto.contactInfo.lastName);
  });

  it('should emit ContactRegistered event with correct company in payload when company provided', async () => {
    const dto = createDummyCaptureLeadDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.company).toBe(dto.contactInfo.company);
  });

  it('should emit ContactRegistered event with undefined company in payload when company not provided', async () => {
    const dto = createDummyCaptureLeadDto();
    const dtoWithoutCompany = {
      ...dto,
      contactInfo: {
        ...dto.contactInfo,
        company: undefined
      }
    };
    const command = new CaptureLeadCommand(dtoWithoutCompany);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.company).toBeUndefined();
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
