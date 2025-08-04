import { GetAllLeadsQueryHandler, GetAllLeadsQuery, LeadReadModel } from '@effectiv-crm/application';
import { dummyLeads } from '../data/dummy.lead-read-models';
import { FakeLeadRepository } from '../../repositories/fakes/fake-lead-repository';

describe('GetAllLeadsQueryHandler', () => {
  let handler: GetAllLeadsQueryHandler;
  let fakeRepository: FakeLeadRepository;

  beforeEach(() => {
    fakeRepository = new FakeLeadRepository(dummyLeads);
    handler = new GetAllLeadsQueryHandler(fakeRepository);
  });

  describe('execute', () => {
    it('should return all leads', async () => {
      const query = new GetAllLeadsQuery();

      const result: LeadReadModel[] = await handler.execute(query);

      expect(result).toEqual(dummyLeads);
    });
  });
});
