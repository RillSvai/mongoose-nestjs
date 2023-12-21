import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateUserPipe
  implements PipeTransform<CreateUserDto, Promise<User>>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async transform(value: CreateUserDto): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({
      email: value.email,
    });
    if (user) {
      throw new BadRequestException(`Email ${user.email} already exist`);
    }
    return new User({ id: uuidv4(), favoriteFoods: [], ...value });
  }
}
