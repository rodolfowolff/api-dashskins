import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);
  const envConfig = app.get(ConfigService);

  // const whitelist = [
  //   'https://dashskin.vercel.app',
  //   'https://www.dashskin.vercel.app',
  //   'https://dashskin.vercel.app/',
  //   'https://www.dashskin.vercel.app/',
  //   'dashskin.vercel.app',
  // ];
  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       console.log('allowed cors for:', origin);
  //       callback(null, true);
  //     } else {
  //       console.log('blocked cors for:', origin);
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   allowedHeaders:
  //     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  //   methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  //   credentials: true,
  // });

  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: 'http://localhost:3000', // [envConfig.get<string>('base_url.frontend')],
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   credentials: true,
  // });

  // app.useGlobalPipes(new ValidationPipe());

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);

  const port = envConfig.get<number>('port');

  await app.listen(port);

  Logger.log(`🚀 Api on: http://localhost:${port}/`);
}
bootstrap();
