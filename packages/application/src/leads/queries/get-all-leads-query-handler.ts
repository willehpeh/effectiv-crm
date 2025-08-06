import { LeadReadModel } from '../read-models/lead.read-model';
import { GetAllLeadsQuery } from './get-all-leads-query';
import { LeadProjection } from '../projections/lead.projection';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllLeadsQuery)
export class GetAllLeadsQueryHandler implements IQueryHandler<GetAllLeadsQuery> {
  constructor(private readonly leadsProjection: LeadProjection) {}

  async execute(query: GetAllLeadsQuery): Promise<LeadReadModel[]> {
    return this.leadsProjection.allLeads();
  }
}
