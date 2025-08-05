import { FakeEventStore } from '../../../common/fixtures/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { CaptureLeadDtoFactory } from '../../fixtures/capture-lead-dto.factory';
import { FakeEventPublisher } from '../../../common/fixtures/fake-event-publisher';

describe('Capture Lead - Orchestration', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it('should publish the correct number of events', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    expect(eventPublisher.publishedEvents.length).toBe(2);
  })

  it('publishes ContactRegistered event', async () => {
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

  it('publishes LeadCaptured event', async () => {
    const dto = dtoFactory.validDto();
    const command = new CaptureLeadCommand(dto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const leadCapturedEvents = eventPublisher.getPublishedEventsOfType('LeadCaptured');
    expect(leadCapturedEvents).toHaveLength(1);
    expect(leadCapturedEvents[0]).toEqual({
      aggregateId: expect.any(String),
      eventType: 'LeadCaptured',
      aggregateType: 'Lead',
      aggregateVersion: 1,
      occurredOn: expect.any(String),
      payload: {
        contactId: expect.any(String),
        source: dto.leadDetails.source,
        contactDate: dto.leadDetails.contactDate,
        details: dto.leadDetails.details,
        referrer: dto.leadDetails.referrer,
      },
      version: 1
    });
  });
});
