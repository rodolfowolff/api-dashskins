import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            privateKey: configService.get<string>('jwt.secret'),
            signOptions: { expiresIn: '1d' },
          }),
          inject: [ConfigService],
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
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
  });
});
