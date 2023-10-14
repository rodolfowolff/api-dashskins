import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Email é obrigatorio.' })
  @IsString({ each: true, message: 'Email deve ser um texto.' })
  @IsEmail({}, { message: 'O email inválido.' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatorio.' })
  @IsString({ message: 'Senha deve ser um texto.' })
  @Length(6, 50, { message: 'Senha deve ter entre 6 e 50 caracteres.' })
  password: string;
}
