import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  nickname: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  password: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  email: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'This is a optional property',
  })
  role: number;
}
