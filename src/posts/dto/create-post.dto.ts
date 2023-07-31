import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'The title is empty' })
  @IsString({ message: 'The title need to be string' })
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  title: string;

  @IsNotEmpty({ message: 'The content is empty' })
  @IsString({ message: 'The content need to be string' })
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  content: string;

  @IsOptional()
  @IsString({ message: 'The image need to be string' })
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  image: string;

  @IsNotEmpty({ message: 'The author_id is empty' })
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  author_id: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  tags: string[];
}
