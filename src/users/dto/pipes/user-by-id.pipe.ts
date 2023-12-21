import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<User>> {
  constructor(private readonly usersRepository: UsersRepository) {}
  async transform(value: string): Promise<User> {
    const user: User | null = await this.usersRepository.findOne({ id: value });

    if (!user) {
      throw new NotFoundException('User doesn`t exist');
    }
    return user;
  }
}
