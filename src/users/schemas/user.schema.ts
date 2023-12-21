import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  age: number;

  @Prop([String])
  favoriteFoods: string[];
}

export const userSchema = SchemaFactory.createForClass(User);
export type UserDocument = User | Document;
