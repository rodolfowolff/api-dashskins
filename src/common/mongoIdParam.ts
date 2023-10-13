import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export class MongoIDParamDTO {
  @IsNotEmpty({ message: 'ID é obrigatorio.' })
  @IsString({ each: true, message: 'ID deve ser um texto.' })
  @IsMongoId({ message: 'valor ${value} não é ID inválido.' })
  @Transform((value) => SafeMongoIdTransform(value))
  id: string;
}

export const SafeMongoIdTransform = ({ value }) => {
  try {
    if (
      Types.ObjectId.isValid(value) &&
      new Types.ObjectId(value).toString() === value
    ) {
      return value;
    } else {
      throw new BadRequestException({
        message: `O valor: ${value}, não é um Id válido.`,
      });
    }
  } catch (error) {
    if (error) throw error;
    throw new BadRequestException({
      message: `O valor: ${value}, não é um Id válido.`,
    });
  }
};
