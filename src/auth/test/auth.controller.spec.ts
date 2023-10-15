import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { AuthDto } from '../dto/auth.dto';
import * as jwt from 'jsonwebtoken';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: 'secretTest', // TODO: Pegar do .env, somente para testes
          signOptions: { expiresIn: '1d' },
        }),
        MongooseModule.forRoot('mongodb://0.0.0.0:27017/dashskins'),
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
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Deve estar definido', () => {
    expect(authController).toBeDefined();
  });

  describe('Login', () => {
    it('Deve retornar o token', async () => {
      const authDto = {
        email: 'admin@admin.com',
        password: 'admin123',
      };

      const result = await authController.signIn(authDto as AuthDto);

      expect(result).toEqual(expect.any(String));

      let decodedToken;
      expect(() => {
        decodedToken = jwt.verify(result, 'secretTest');
      }).not.toThrow();

      expect(decodedToken).toHaveProperty('sub');
      expect(decodedToken).toHaveProperty('exp');
      expect(decodedToken).toHaveProperty('iat');
    });
  });
});
