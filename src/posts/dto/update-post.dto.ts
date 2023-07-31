import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  content: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  image: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  author_id: string;

  @IsArray()
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  tags: string[];
}
