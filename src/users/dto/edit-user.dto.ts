import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString({ each: true, message: 'Nome deve ser um texto.' })
  @Length(3, 120, {
    message: 'O nome deve ter entre 3 e 120 caracteres.',
  })
  readonly username: string;

  /**  */
  @IsOptional()
  @IsString({ each: true, message: 'Email deve ser um texto.' })
  @IsEmail({}, { message: 'Email inválido.' })
  readonly email: string;

  /**  */
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Idade deve ser um número.' },
  )
  @Min(1, {
    message: 'Idade deve ser no mínimo 1.',
  })
  @Max(110, {
    message: 'Idade deve ser no máximo 110.',
  })
  readonly age: number;

  /**  */
  @IsOptional()
  @IsString({ each: true, message: 'Avatar deve ser um texto.' })
  @Length(1, 255, {
    message: 'Avatar deve ter entre 1 e 255 caracteres.',
  })
  @IsUrl(undefined, { message: 'Avatar deve ser um URL.' })
  readonly avatar: string;
}
