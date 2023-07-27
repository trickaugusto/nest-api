import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { MongoIdValidationGuard } from 'src/guards/mongo-id-validation.guard';
import { CheckUserExistValidationPipe } from './pipes/check-exist-user-validation.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(CheckUserExistValidationPipe)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseGuards(MongoIdValidationGuard)
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('author/:id')
  @UseGuards(MongoIdValidationGuard)
  async findAllPostsByAuthor(@Param('id') id: string) {
    const posts = await this.postsService.findAllPostsByAuthor(id);

    if (!posts.length) {
      throw new NotFoundException();
    }

    return posts;
  }

  @Patch(':id')
  @UseGuards(MongoIdValidationGuard)
  @UsePipes(CheckUserExistValidationPipe)
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(MongoIdValidationGuard)
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
