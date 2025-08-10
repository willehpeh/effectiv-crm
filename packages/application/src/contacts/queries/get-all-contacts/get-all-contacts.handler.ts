import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllContactsQuery } from './get-all-contacts.query';
import { ContactProjection } from '../../projections/contact.projection';
import { ContactReadModel } from '../../read-models/contact.read-model';

@Injectable()
@QueryHandler(GetAllContactsQuery)
export class GetAllContactsQueryHandler implements IQueryHandler<GetAllContactsQuery> {
  constructor(private readonly contactProjection: ContactProjection) {}

  async execute(query: GetAllContactsQuery): Promise<ContactReadModel[]> {
    return this.contactProjection.getAllContacts();
  }
}
