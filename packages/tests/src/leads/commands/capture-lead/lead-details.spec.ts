import { FakeEventStore } from '../../../test-doubles/fake.event-store';
import { CaptureLeadDtoFactory } from './capture-lead-dto.factory';

describe('Capture Lead - Lead Details', () => {
  let eventStore: FakeEventStore;
  const dtoFactory = new CaptureLeadDtoFactory();

  beforeEach(() => {
    eventStore = new FakeEventStore();
  });

  it('placeholder', () => {
    expect(true).toBe(true);
  });
});
