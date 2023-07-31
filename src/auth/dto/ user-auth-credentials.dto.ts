import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  password: string;
}
