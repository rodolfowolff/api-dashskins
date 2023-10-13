import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { usersArray } from './mock-user';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
