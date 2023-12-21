import { IsEmail, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Min(18)
  age: number;
}
