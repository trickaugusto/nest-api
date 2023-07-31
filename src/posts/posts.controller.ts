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
import { UserRoles } from 'src/auth/enums/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @Roles(UserRoles.admin, UserRoles.editor)
  @UsePipes(CheckUserExistValidationPipe)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Roles(UserRoles.admin, UserRoles.leitor, UserRoles.editor)
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.admin, UserRoles.leitor, UserRoles.editor)
  @UseGuards(MongoIdValidationGuard)
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('author/:id')
  @Roles(UserRoles.admin, UserRoles.leitor, UserRoles.editor)
  @UseGuards(MongoIdValidationGuard)
  async findAllPostsByAuthor(@Param('id') id: string) {
    const posts = await this.postsService.findAllPostsByAuthor(id);

    if (!posts.length) {
      throw new NotFoundException();
    }

    return posts;
  }

  @Patch(':id')
  @UseGuards(MongoIdValidationGuard, AuthGuard('jwt'))
  @Roles(UserRoles.admin, UserRoles.editor)
  @UsePipes(CheckUserExistValidationPipe)
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(MongoIdValidationGuard, AuthGuard('jwt'))
  @Roles(UserRoles.admin)
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
