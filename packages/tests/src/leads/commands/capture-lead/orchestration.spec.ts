import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { CaptureLeadDtoFactory } from './capture-lead-dto.factory';
import { FakeEventPublisher } from '../../../test-doubles/fake-event-publisher';

describe('Capture Lead - Orchestration', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it('records the newly captured lead', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    expect(eventStore.events[1].eventType).toBe('LeadCaptured');
  });

  it('publishes ContactRegistered event to event publisher', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const contactRegisteredEvents = eventPublisher.getPublishedEventsOfType('ContactRegistered');
    expect(contactRegisteredEvents).toHaveLength(1);
    expect(contactRegisteredEvents[0]).toEqual({
      aggregateId: expect.any(String),
      eventType: 'ContactRegistered',
      aggregateType: 'Contact',
      aggregateVersion: 1,
      occurredOn: expect.any(String),
      payload: {
        firstName: dto.contactInfo.firstName,
        lastName: dto.contactInfo.lastName,
        email: dto.contactInfo.email,
        company: dto.contactInfo.company,
      },
      version: 1
    });
  });
});
