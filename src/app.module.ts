import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { validate } from './config/env-validation';
import environmentConfig from './config/env-config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { seconds, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
      load: [environmentConfig],
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: seconds(3), // 3 requests por 1 segundo
      },
      {
        name: 'medium',
        ttl: seconds(10),
        limit: 20, // 20 requests por 10 segundos
      },
      {
        name: 'long',
        ttl: seconds(60), // 1 minuto
        limit: 100, // 100 requests por 1 minuto
      },
    ]),
    MongooseModule.forRoot(environmentConfig().databaseUrl),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
