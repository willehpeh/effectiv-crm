import { NestFactory } from '@nestjs/core';
import { AppModule } from '../apps/api/src/app/app.module';
import { MikroORM } from '@mikro-orm/core';

async function initializeDatabase() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  
  console.log('Creating database schema...');
  await orm.getSchemaGenerator().createSchema();
  console.log('Database schema created successfully');
  
  await app.close();
}

initializeDatabase().catch(console.error);
