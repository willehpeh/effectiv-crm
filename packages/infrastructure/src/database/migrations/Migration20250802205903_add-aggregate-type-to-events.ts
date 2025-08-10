import { Migration } from '@mikro-orm/migrations';

export class Migration20250802205903_addAggregateTypeToEventsggregate extends Migration {

  override async up(): Promise<void> {
    // Add the aggregate_type column as nullable first
    this.addSql(`alter table "events" add column "aggregate_type" varchar(100);`);

    // Populate existing rows by extracting aggregate type from event_type
    // Assumes event types follow pattern like "ContactCreated", etc.
    this.addSql(`
      update "events" 
      set "aggregate_type" = 
        case 
          when "event_type" like 'Contact%' then 'Contact'
          else regexp_replace("event_type", '([A-Z][a-z]+).*', '\\1')
        end
      where "aggregate_type" is null;
    `);

    // Make the column not null after populating data
    this.addSql(`alter table "events" alter column "aggregate_type" set not null;`);

    // Create index on the new column
    this.addSql(`create index "events_aggregate_type_index" on "events" ("aggregate_type");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index "events_aggregate_type_index";`);
    this.addSql(`alter table "events" drop column "aggregate_type";`);
  }

}
