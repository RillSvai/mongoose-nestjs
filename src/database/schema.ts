import { Prop } from '@nestjs/mongoose';

export abstract class SchemaBase<T> {
  @Prop({ unique: true })
  id: string;

  constructor(item: Partial<T>) {
    Object.assign(this, item);
  }
}
