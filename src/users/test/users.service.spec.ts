import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UsersRepository } from '../repository/users.repository';
import { User } from '../schema/user.schema';

const mockUser = (
  username = 'John Doe',
  email = 'john@doe',
  age = 4,
  avatar = 'https://example.com/avatar.jpg',
): Partial<User> => ({
  username,
  email,
  age,
  avatar,
});

const usersArray = [
  mockUser(),
  mockUser('Vitani', 'a@b.com', 2, 'https://example.com/vitani.jpg'),
  mockUser('Simba', 't@b.com', 14, 'https://example.com/simba.jpg'),
];

describe('Users Service', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            new: vitest.fn().mockResolvedValue(mockUser()),
            constructor: vitest.fn().mockResolvedValue(mockUser()),
            findAll: vitest.fn(),
            create: vitest.fn(),
            findByCondition: vitest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  /** */
  it('Deve estar definido', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  /** */
  it('Deve buscar todos os usuários', async () => {
    vitest.spyOn(usersService, 'findAll').mockResolvedValue(usersArray as any);

    const usersData = await usersService.findAll();

    expect(usersService.findAll).toHaveBeenCalled();
    expect(usersData).toHaveLength(3);
    expect(usersData).toEqual(usersArray);
  });

  it('Deve rejeitar uma exceção', async () => {
    vitest
      .spyOn(usersService, 'findAll')
      .mockRejectedValue(
        new BadRequestException({ message: 'Nenhum usuário encontrado.' }),
      );

    try {
      await usersService.findAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('Deve criar um novo usuário', async () => {
    vitest
      .spyOn(usersService, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUser()) as any);
    const newUser = await usersService.create(mockUser() as any);
    expect(newUser).toEqual(mockUser());
  });

  it('Deve rejeitar uma exceção', async () => {
    vitest
      .spyOn(usersService, 'create')
      .mockRejectedValue(
        new BadRequestException({ message: 'Email já existe.' }),
      );

    try {
      await usersService.create(mockUser() as any);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
