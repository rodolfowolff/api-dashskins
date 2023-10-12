import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { ApiResponse } from '@/common/response';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }
  async create(body: CreateUserDto): Promise<ApiResponse> {
    await this.isEmailUnique(body.email);

    try {
      const createdUser = await this.userRepository.create(body);

      if (createdUser) {
        throw new ApiResponse(
          {
            success: true,
            message: 'Usuário criado com sucesso.',
            data: createdUser,
          },
          HttpStatus.OK,
        );
      }

      throw new ApiResponse(
        {
          success: false,
          message: 'Erro ao criar usuário.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      if (error) throw error;
      throw new ApiResponse(
        {
          success: false,
          message: 'Erro ao criar usuário.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<ApiResponse> {
    try {
      const users = await this.userRepository.findAll();

      throw new ApiResponse(
        {
          success: true,
          message: 'Usuários encontrados.',
          data: users,
        },
        HttpStatus.OK,
      );
    } catch (error) {
      if (error) throw error;
      throw new ApiResponse(
        {
          success: false,
          message: 'Erro ao encontrar usuários.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
        throw new ApiResponse(
          {
            success: false,
            message: 'Email em uso.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      if (error) throw error;
      throw new ApiResponse(
        {
          success: false,
          message: 'Erro ao verificar email.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
