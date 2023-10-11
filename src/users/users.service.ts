import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }
  async create(body: CreateUserDto) {
    await this.isEmailUnique(body.email);
    return body;
  }

  /** Metodos privados */
  private async isEmailUnique(email: string) {
    const emailExists = await this.userRepository.findByCondition(
      { email },
      { email: 1 }, // retorna somente email
    );
    if (emailExists) {
      throw new BadRequestException('Email em uso.');
    }
  }
}
