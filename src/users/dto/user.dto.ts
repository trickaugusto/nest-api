import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: number;
}
