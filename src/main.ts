import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImATeapotException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const whitelist = [
    'dashskin.vercel.app',
    'dashskin-rodolfowolff.vercel.app',
    'https://dashskin-git-master-rodolfowolff.vercel.app/',
    'https://dashskin-rodolfowolff.vercel.app/',
    'https://dashskin.vercel.app/dashboard',
    'https://dashskin.vercel.app',
    'https://dashskin.vercel.app/dashboard/',
    'https://dashskin.vercel.app/',
  ];

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: {
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      origin: function (origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        if (
          whitelist.includes(origin) ||
          !!origin.match(/dashskin.vercel.app\.com$/)
        ) {
          console.log('allowed cors for:', origin);
          callback(null, true);
        } else {
          console.log('blocked cors for:', origin);
          callback(new ImATeapotException('Not allowed by CORS'), false);
        }
      },
    },
  });

  const envConfig = app.get(ConfigService);

  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: 'https://dashskin.vercel.app',
  //   credentials: true,
  // });

  app.useGlobalPipes(new ValidationPipe());

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);

  const port = envConfig.get<number>('port');

  await app.listen(port);

  Logger.log(`🚀 Api on: http://localhost:${port}/`);
}
bootstrap();
