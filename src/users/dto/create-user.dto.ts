import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Validate,
  MinLength,
  MaxLength,
} from 'class-validator';
import { isValidRole } from '../validators/isValidRole.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The username is empty' })
  @IsString({ message: 'The username need to be string' })
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  username: string;

  @IsNotEmpty({ message: 'The nickname is empty' })
  @IsString({ message: 'The nickname need to be string' })
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  nickname: string;

  @IsNotEmpty({ message: 'The password is empty' })
  @MinLength(6)
  @MaxLength(255)
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  password: string;

  @IsNotEmpty({ message: 'The email is empty' })
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  email: string;

  @Validate(isValidRole, { message: 'Invalid role. Only 1, 2, or 3 allowed.' })
  @ApiProperty({
    type: Number,
    description: 'This is a required property. Only 1, 2, or 3 allowed.',
  })
  role: number;
}
