import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
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
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Deve retornar "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
