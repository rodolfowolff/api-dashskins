import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfig = app.get(ConfigService);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*', // [envConfig.get<string>('base_url.frontend')],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);

  const port = envConfig.get<number>('port');

  await app.listen(port);

  Logger.log(`🚀 Api on: http://localhost:${port}/`);
}
bootstrap();
