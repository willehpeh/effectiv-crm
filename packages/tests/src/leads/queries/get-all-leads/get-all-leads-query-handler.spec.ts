import { GetAllLeadsQueryHandler, GetAllLeadsQuery, LeadReadModel } from '@effectiv-crm/application';
import { dummyLeads } from '../data/dummy.lead-read-models';
import { FakeLeadsProjection } from '../fakes/fake-leads-projection';

describe('GetAllLeadsQueryHandler', () => {
  let handler: GetAllLeadsQueryHandler;
  let fakeProjection: FakeLeadsProjection;

  beforeEach(() => {
    fakeProjection = new FakeLeadsProjection(dummyLeads);
    handler = new GetAllLeadsQueryHandler(fakeProjection);
  });

  describe('execute', () => {
    it('should return all leads', async () => {
      const query = new GetAllLeadsQuery();

      const result: LeadReadModel[] = await handler.execute(query);

      expect(result).toEqual(dummyLeads);
    });
  });
});
