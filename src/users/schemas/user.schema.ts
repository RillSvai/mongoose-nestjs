import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaBase } from '../../database/schema';

@Schema()
export class User extends SchemaBase<User> {
  @Prop({ unique: true })
  email: string;

  @Prop()
  age: number;

  @Prop([String])
  favoriteFoods: string[];
}

export const userSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
