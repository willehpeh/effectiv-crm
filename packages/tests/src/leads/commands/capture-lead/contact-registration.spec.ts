import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { CaptureLeadDtoFactory } from './capture-lead-dto.factory';
import { ContactRegisteredEvent } from '@effectiv-crm/domain';

describe('Capture Lead - Contact Registration', () => {
  let eventStore: FakeEventStore;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
  });

  it('registers the contact details when a lead is captured', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    expect(eventStore.events[0].eventType).toBe('ContactRegistered');
  });

  it('saves the contact\'s first name', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.firstName).toBe(dto.contactInfo.firstName);
  });

  it('saves the contact\'s last name', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.lastName).toBe(dto.contactInfo.lastName);
  });

  it('stores the company name when it is supplied', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.company).toBe(dto.contactInfo.company);
  });

  it('leaves the company blank when none is supplied', async () => {
    const dtoWithoutCompany = dtoFactory.withNoCompany();
    const command = new CaptureLeadCommand(dtoWithoutCompany);
    const handler = new CaptureLeadCommandHandler(eventStore);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.company).toBeUndefined();
  });
});
