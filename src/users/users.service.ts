import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repository/users.repository';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) { }
  async create(body: CreateUserDto): Promise<User> {
    await this.isEmailUnique(body.email);

    try {
      const createdUser = await this.userRepository.create(body);

      if (createdUser) {
        return createdUser;
      }

      throw new InternalServerErrorException({
        message: 'Erro ao criar usuário.',
      });
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException({
        message: 'Aconteceu algum erro ao criar usuário.',
      });
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();

      if (!users) {
        throw new BadRequestException({
          message: 'Nenhum usuário encontrado.',
        });
      }

      return users;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException({
        message: 'Erro ao buscar usuários.',
      });
    }
  }

  /** Metodos privados */
  private async isEmailUnique(email: string) {
    try {
      const emailExists = await this.userRepository.findByCondition(
        { email },
        { email: 1 }, // retorna somente email
      );
      if (emailExists) {
        throw new BadRequestException({
          message: 'Email já existe.',
        });
      }

      return emailExists;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException({
        message: 'Aconteceu algum erro ao verificar se existe o email.',
      });
    }
  }
}
