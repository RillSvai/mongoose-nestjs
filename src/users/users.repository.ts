import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from 'src/database/repository';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends RepositoryBase<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {
    super(usersModel);
  }
}
