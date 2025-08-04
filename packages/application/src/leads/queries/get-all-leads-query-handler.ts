import { LeadReadModel } from './lead-read-model';
import { GetAllLeadsQuery } from './get-all-leads-query';
import { LeadRepository } from '../repositories/lead-repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllLeadsQuery)
export class GetAllLeadsQueryHandler implements IQueryHandler<GetAllLeadsQuery> {
  constructor(private readonly leadRepository: LeadRepository) {}

  async execute(query: GetAllLeadsQuery): Promise<LeadReadModel[]> {
    return this.leadRepository.getAllLeads();
  }
}
