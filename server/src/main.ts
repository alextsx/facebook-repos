import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1/');
  app.enableCors({
    credentials: true,
    origin: ['localhost:3000'],
  });
  await app.listen(8000);
}

bootstrap();
