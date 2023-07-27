import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'The title is empty' })
  @IsString({ message: 'The title need to be string' })
  title: string;

  @IsNotEmpty({ message: 'The content is empty' })
  @IsString({ message: 'The content need to be string' })
  content: string;

  @IsOptional()
  @IsString({ message: 'The image need to be string' })
  image: string;

  @IsNotEmpty({ message: 'The author_id is empty' })
  @IsString()
  author_id: string;

  @IsOptional()
  @IsArray()
  tags: string[];
}
