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
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { MongoIdValidationGuard } from 'src/guards/mongo-id-validation.guard';
import { CheckUserExistValidationPipe } from './pipes/check-exist-user-validation.pipe';
import { UserRoles } from 'src/auth/enums/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetPostDto } from './dto/post.dto';
import { isValidDate } from './helpers/dateValidate';

@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer (token)',
})
@ApiBearerAuth()
@ApiTags('Posts')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles(UserRoles.admin, UserRoles.editor)
  @UsePipes(CheckUserExistValidationPipe)
  @ApiResponse({ status: 201, type: CreatePostDto })
  @ApiOperation({ summary: 'Create a new post' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Roles(UserRoles.admin, UserRoles.leitor, UserRoles.editor)
  @ApiResponse({ status: 200, type: GetPostDto, isArray: true })
  @ApiOperation({ summary: 'Find all posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.admin, UserRoles.leitor, UserRoles.editor)
  @UseGuards(MongoIdValidationGuard)
  @ApiResponse({ status: 200, type: GetPostDto })
  @ApiOperation({ summary: 'Find one post' })
  @ApiBadRequestResponse({
    description: 'Ilegal format of ID',
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('date/:initial_date/:final_date')
  @Roles(UserRoles.admin, UserRoles.leitor, UserRoles.editor)
  @ApiResponse({ status: 200, type: GetPostDto })
  @ApiOperation({ summary: 'Find all posts between createdAt range' })
  @ApiBadRequestResponse({
    description: 'Invalid format date',
  })
  findByDate(
    @Param('initial_date') initialDate: Date,
    @Param('final_date') finalDate: Date,
  ) {
    if (!isValidDate(initialDate) || !isValidDate(finalDate)) {
      throw new BadRequestException('Invalid format date');
    }

    return this.postsService.findByDate(initialDate, finalDate);
  }

  @Get('author/:id')
  @Roles(UserRoles.admin, UserRoles.leitor, UserRoles.editor)
  @UseGuards(MongoIdValidationGuard)
  @ApiOperation({ summary: 'Find all posts, filtering by author_id' })
  @ApiBadRequestResponse({
    description: 'Ilegal format of ID',
  })
  @ApiResponse({ status: 200, type: GetPostDto })
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
  @ApiResponse({ status: 201 })
  @ApiOperation({ summary: 'Update by id post' })
  @ApiBadRequestResponse({
    description: 'Ilegal format of ID',
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(MongoIdValidationGuard, AuthGuard('jwt'))
  @ApiResponse({ status: 204 })
  @ApiOperation({ summary: 'Delete by id post' })
  @ApiBadRequestResponse({
    description: 'Ilegal format of ID',
  })
  @Roles(UserRoles.admin)
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
