import { GetAllLeadsQueryHandler, GetAllLeadsQuery, LeadReadModel } from '@effectiv-crm/application';
import { dummyLeads } from './lead-test-data';

describe('GetAllLeadsQueryHandler', () => {
  let handler: GetAllLeadsQueryHandler;

  beforeEach(() => {
    handler = new GetAllLeadsQueryHandler();
  });

  describe('execute', () => {
    it('should return all leads', async () => {
      const query = new GetAllLeadsQuery();

      const result: LeadReadModel[] = await handler.execute(query);

      expect(result).toEqual(dummyLeads);
    });
  });
});
