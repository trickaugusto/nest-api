import { IsNotEmpty, IsEmail, IsString, Validate } from 'class-validator';
import { isValidRole } from '../validators/isValidRole.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The username is empty' })
  @IsString({ message: 'The username need to be string' })
  username: string;

  @IsNotEmpty({ message: 'The nickname is empty' })
  @IsString({ message: 'The nickname need to be string' })
  nickname: string;

  @IsNotEmpty({ message: 'The password is empty' })
  @IsString({ message: 'The password need to be string' })
  password: string;

  @IsNotEmpty({ message: 'The email is empty' })
  @IsEmail()
  email: string;

  @Validate(isValidRole, { message: 'Invalid role. Only 1, 2, or 3 allowed.' })
  role: number;
}
