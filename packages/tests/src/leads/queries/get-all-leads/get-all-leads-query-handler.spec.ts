import { GetAllLeadsQueryHandler, GetAllLeadsQuery, LeadReadModel } from '@effectiv-crm/application';
import { dummyLeads } from '../../fixtures/dummy.lead-read-models';
import { FakeLeadsProjection } from '../../fixtures/fake-leads-projection';

describe('GetAllLeadsQueryHandler', () => {
  let handler: GetAllLeadsQueryHandler;
  let fakeProjection: FakeLeadsProjection;

  beforeEach(() => {
    fakeProjection = new FakeLeadsProjection();
    dummyLeads.forEach(lead => fakeProjection.addLead(lead));
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
