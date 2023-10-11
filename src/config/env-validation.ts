import { plainToInstance, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, validateSync } from 'class-validator';

class EnvironmentVariables {
  @Transform(({ value }) => Number(value))
  PORT: number;

  /** */
  @IsNotEmpty({ message: 'DATABASE_URL é obrigatório.' })
  @IsString({ each: true, message: 'DATABASE_URL deve ser um texto.' })
  @Length(12, 300)
  DATABASE_URL: string;

  /** */
  @IsNotEmpty({ message: 'JWT_SECRET é obrigatório.' })
  @IsString({ each: true, message: 'JWT_SECRET deve ser um texto.' })
  @Length(2, 40, {
    message: 'JWT_SECRET deve ter entre 2 e 40 caracteres.',
  })
  JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
