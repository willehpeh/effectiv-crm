import { Migration } from '@mikro-orm/migrations';

export class Migration20250728205120CreateEventsTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "events" ("id" bigserial primary key, "aggregate_id" uuid not null, "aggregate_version" int not null, "event_type" varchar(255) not null, "occurred_on" varchar(30) not null, "payload" jsonb not null, "metadata" jsonb not null);`);
    this.addSql(`create index "events_aggregate_id_index" on "events" ("aggregate_id");`);
    this.addSql(`create index "events_event_type_index" on "events" ("event_type");`);
    this.addSql(`alter table "events" add constraint "events_aggregate_id_aggregate_version_unique" unique ("aggregate_id", "aggregate_version");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "events" cascade;`);
  }

}
