import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    minlength: 6,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
  })
  username: string;

  @Prop({
    unique: true,
    lowercase: true,
    minlength: 6,
    maxlength: 255,
    required: [true, 'EMAIL_IS_BLANK'],
  })
  email: string;

  @Prop({ type: Number, required: [true, 'AGE_IS_BLANK'], min: 1, max: 110 })
  age: number;

  @Prop({ required: [true, 'AVATAR_IS_BLANK'], minlength: 1, maxlength: 255 })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
