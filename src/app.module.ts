import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { validate } from './config/env-validation';
import environmentConfig from './config/env-config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
      load: [environmentConfig],
    }),
    MongooseModule.forRoot(environmentConfig().databaseUrl),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
