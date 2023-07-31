import { ApiProperty } from '@nestjs/swagger';

export class GetPostDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  author_id: string;

  @ApiProperty({ type: [String] })
  tags: string[];
}

export class CreatePostDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  author_id: string;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
