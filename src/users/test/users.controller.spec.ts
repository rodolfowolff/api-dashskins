import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { usersArray } from './mock-user';
import { JwtModule } from '@nestjs/jwt';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            privateKey: configService.get<string>('jwt.secret'),
            signOptions: { expiresIn: '1d' },
          }),
          inject: [ConfigService],
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
      ],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAll: vitest
              .fn<CreateUserDto[], unknown[]>()
              .mockImplementation(() => usersArray),
          },
        },
      ],
    }).compile();

    controller = module.get(UsersController);
  });

  it('Deve estar definido', () => {
    expect(controller).toBeDefined();
  });
});
