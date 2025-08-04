import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadCommand, CaptureLeadCommandHandler } from '@effectiv-crm/application';
import { CaptureLeadDtoFactory } from './capture-lead-dto.factory';
import { EmptyNameError, InvalidEmailError } from '@effectiv-crm/domain';
import { FakeEventPublisher } from '../../../test-doubles/fake-event-publisher';

describe('Capture Lead - Validation', () => {
  let eventStore: FakeEventStore;
  let eventPublisher: FakeEventPublisher;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
    eventPublisher = new FakeEventPublisher();
  });

  it('rejects a lead that has an invalid email address', async () => {
    const invalidEmailDto = dtoFactory.withInvalidEmail();
    const command = new CaptureLeadCommand(invalidEmailDto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expect(handler.execute(command)).rejects.toBeInstanceOf(InvalidEmailError);
  });

  it('rejects a lead that has an empty first name', async () => {
    const emptyFirstNameDto = dtoFactory.withFirstName('');
    const command = new CaptureLeadCommand(emptyFirstNameDto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expectEmptyNameError(handler, command);
  });

  it('rejects a lead that has an empty last name', async () => {
    const emptyFirstNameDto = dtoFactory.withLastName('');
    const command = new CaptureLeadCommand(emptyFirstNameDto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expectEmptyNameError(handler, command);
  });

  it('rejects a lead that has a first name that is only whitespace', async () => {
    const whitespaceFirstNameDto = dtoFactory.withFirstName(' \n\t ');
    const command = new CaptureLeadCommand(whitespaceFirstNameDto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expectEmptyNameError(handler, command);
  });

  it('rejects a lead that has a last name that is only whitespace', async () => {
    const whitespaceFirstNameDto = dtoFactory.withLastName(' \n\t ');
    const command = new CaptureLeadCommand(whitespaceFirstNameDto);
    const handler = new CaptureLeadCommandHandler(eventStore, eventPublisher);

    await expectEmptyNameError(handler, command);
  });
});

function expectEmptyNameError(handler: CaptureLeadCommandHandler, command: CaptureLeadCommand) {
  return expect(handler.execute(command)).rejects.toBeInstanceOf(EmptyNameError);
}
