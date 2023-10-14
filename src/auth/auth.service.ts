import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptUtils } from '@/common/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    // TODO: Somente para testes: Admin tem acesso
    if (!user || user.email.toLocaleLowerCase() !== 'admin@admin.com') {
      throw new UnauthorizedException();
    }

    const passwordTest = 'admin123';
    const passwordCrypt = BcryptUtils.hashPassword(passwordTest);

    const validPass = BcryptUtils.isValidPassword(password, passwordCrypt);

    if (!validPass) {
      throw new UnauthorizedException();
    }

    return this.jwtService.sign({ sub: user.id }, { expiresIn: '1d' });
  }
}
