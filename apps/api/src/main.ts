import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AuthMiddleware } from './app/middleware/auth.middleware';
import { CorrelationMiddleware } from './app/middleware/correlation.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.use(AuthMiddleware);
  app.use(CorrelationMiddleware);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
