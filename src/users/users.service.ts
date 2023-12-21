import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(
      new User({ id: uuidv4(), favoriteFoods: [], ...createUserDto }),
    );
  }

  async findOneAndUpdate(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return await this.usersRepository.findOneAndUpdate(
      { id },
      new User({ ...updateUserDto }),
    );
  }

  async deleteOne(id: string): Promise<boolean> {
    return await this.usersRepository.deleteOne({ id });
  }
}
