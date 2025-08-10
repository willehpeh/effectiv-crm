import { FakeEventStore } from '../../../common/fixtures/fake.event-store';
import { RegisterContactCommand, RegisterContactCommandHandler } from '@effectiv-crm/application';
import { RegisterContactDtoFactory } from '../../fixtures/register-contact-dto.factory';
import { ContactRegisteredEvent } from '@effectiv-crm/domain';
import { FakeEventPublisher } from '../../../common/fixtures/fake-event-publisher';

describe('Register Contact', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;
  const dtoFactory = new RegisterContactDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it('registers a contact', async () => {
    const dto = dtoFactory.validDto();
    const command = new RegisterContactCommand(dto);
    const handler = new RegisterContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    expect(eventStore.events).toHaveLength(1);
    expect(eventStore.events[0].eventType).toBe('ContactRegistered');
  });

  it('saves the contact\'s first name', async () => {
    const dto = dtoFactory.validDto();
    const command = new RegisterContactCommand(dto);
    const handler = new RegisterContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.firstName).toBe(dto.firstName);
  });

  it('saves the contact\'s last name', async () => {
    const dto = dtoFactory.validDto();
    const command = new RegisterContactCommand(dto);
    const handler = new RegisterContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.lastName).toBe(dto.lastName);
  });

  it('saves the contact\'s email', async () => {
    const dto = dtoFactory.validDto();
    const command = new RegisterContactCommand(dto);
    const handler = new RegisterContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.email).toBe(dto.email);
  });

  it('stores the company name when it is supplied', async () => {
    const dto = dtoFactory.validDto();
    const command = new RegisterContactCommand(dto);
    const handler = new RegisterContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.company).toBe(dto.company);
  });

  it('leaves the company blank when none is supplied', async () => {
    const dtoWithoutCompany = dtoFactory.withNoCompany();
    const command = new RegisterContactCommand(dtoWithoutCompany);
    const handler = new RegisterContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    const contactRegisteredEvent = eventStore.events[0] as ContactRegisteredEvent;
    expect(contactRegisteredEvent.payload.company).toBeUndefined();
  });

  it('publishes the contact registered event', async () => {
    const dto = dtoFactory.validDto();
    const command = new RegisterContactCommand(dto);
    const handler = new RegisterContactCommandHandler(eventStore, eventPublisher);

    await handler.execute(command);

    expect(eventPublisher.publishedEvents).toHaveLength(1);
    expect(eventPublisher.publishedEvents[0].eventType).toBe('ContactRegistered');
  });
});
