import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadDtoFactory } from './capture-lead-dto.factory';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { InvalidContactDateError, InvalidLeadSourceError, MissingReferrerError, LeadCapturedEvent } from '@effectiv-crm/domain';
import { FakeEventPublisher } from '../../../test-doubles/fake-event-publisher';

describe('Capture Lead - Lead Details', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it.each([
    'website',
    'social-media',
    'referral',
    'email-campaign',
    'cold-call',
    'conference'
  ])('should save the lead source when it is valid', async (source) => {
    const dto = dtoFactory.withSource(source);
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const leadCapturedEvent = eventStore.events[1] as LeadCapturedEvent;
    expect(leadCapturedEvent.payload.source).toBe(source);
  });

  it('should reject the lead if the source is not valid', async () => {
    const dto = dtoFactory.withSource('invalid-source');
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(InvalidLeadSourceError);
  });

  it('should save the lead contact date when it is valid', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const event = eventStore.events[1] as LeadCapturedEvent;
    expect(event.payload.contactDate).toBe(dto.leadDetails.contactDate);
  });

  it('should reject the lead if the contact date format is invalid', async () => {
    const dto = dtoFactory.withContactDate('01/15/2025');
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(InvalidContactDateError);
  });

  it('should reject the lead if the contact date has an invalid month', async () => {
    const dto = dtoFactory.withContactDate('2025-13-15');
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(InvalidContactDateError);
  });

  it.each([
    nextYear(),
    nextMonth(),
    tomorrow()
  ])('should reject the lead if the contact date is in the future: %s', async (futureDate) => {
    const dto = dtoFactory.withContactDate(futureDate);
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(InvalidContactDateError);
  });

  it.each(invalidDayDates())('should reject the lead if the contact date has an invalid day: %s', async (invalidDate) => {
    const dto = dtoFactory.withContactDate(invalidDate);
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(InvalidContactDateError);
  });

  it('should reject the lead if source is referral but no referrer is provided', async () => {
    const dto = dtoFactory.withNoReferrer();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(MissingReferrerError);
  });

  it('should save the referrer when source is referral', async () => {
    const dto = dtoFactory.withSourceAndReferrer('referral', 'John Smith');
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const leadCapturedEvent = eventStore.events[1] as LeadCapturedEvent;
    expect(leadCapturedEvent.payload.referrer).toBe('John Smith');
  });

  it('should not include referrer field when source is not referral', async () => {
    const dto = dtoFactory.withSource('website');
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const leadCapturedEvent = eventStore.events[1] as LeadCapturedEvent;
    expect(leadCapturedEvent.payload).not.toHaveProperty('referrer');
  });

  it('should save the lead details', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const leadCapturedEvent = eventStore.events[1] as LeadCapturedEvent;
    expect(leadCapturedEvent.payload.details).toBe('Interested in premium package');
  });
});

function tomorrow(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

function nextMonth(): string {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth.toISOString().split('T')[0];
}

function nextYear() {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  return nextYear.toISOString().split('T')[0];
}

function invalidDayDates(): string[] {
  return [
    '2024-01-32',
    '2024-02-30',
    '2024-03-32',
    '2024-04-31',
    '2024-05-32',
    '2024-06-31',
    '2024-07-32',
    '2024-08-32',
    '2024-09-31',
    '2024-10-32',
    '2024-11-31',
    '2024-12-32'
  ];
}
