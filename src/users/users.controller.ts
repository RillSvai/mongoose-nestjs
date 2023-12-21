import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }

  @Get(':id')
  findOneById(@Param('id', ParseUUIDPipe, UserByIdPipe) user: User): User {
    return user;
  }

  @Post()
  async create(
    @Body(CreateUserPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return await this.usersService.findOneAndUpdate(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return (await this.usersService.deleteOne(id))
      ? 'Deleted successfully'
      : 'Deleting failed';
  }
}
