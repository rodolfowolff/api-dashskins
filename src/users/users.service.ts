import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repository/users.repository';
import { User } from './schema/user.schema';
import { EditUserDto } from './dto/edit-user.dto';

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

  async update(id: string, body: EditUserDto): Promise<User> {
    try {
      if (body.email) {
        const findUserEmail = await this.userRepository.findByCondition(
          { email: body.email.toLocaleLowerCase() },
          { id: 1 }, // retorna somente email
        );

        // Verifica se o id do usuario e diferente do usuario no banco
        if (findUserEmail?.id.toString() !== id) {
          // Verifica se o email ja existe
          await this.isEmailUnique(body.email);
        }
      }

      const updatedUser = await this.userRepository.findByIdAndUpdate(id, body);

      if (updatedUser) {
        return updatedUser;
      }

      throw new InternalServerErrorException({
        message: 'Erro ao atualizar usuário.',
      });
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException({
        message: 'Aconteceu algum erro ao atualizar usuário.',
      });
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const deletedUser = await this.userRepository.findByIdAndDelete(id);

      if (deletedUser) {
        return 'Usuário deletado com sucesso.';
      }

      throw new InternalServerErrorException({
        message: 'Erro ao deletar usuário.',
      });
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException({
        message: 'Aconteceu algum erro ao deletar usuário.',
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
