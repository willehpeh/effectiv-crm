import { LeadReadModel } from '../read-models/lead-read-model';
import { GetAllLeadsQuery } from './get-all-leads-query';
import { LeadsProjection } from '../projections/leads-projection';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllLeadsQuery)
export class GetAllLeadsQueryHandler implements IQueryHandler<GetAllLeadsQuery> {
  constructor(private readonly leadsProjection: LeadsProjection) {}

  async execute(query: GetAllLeadsQuery): Promise<LeadReadModel[]> {
    return this.leadsProjection.getAllLeads();
  }
}
