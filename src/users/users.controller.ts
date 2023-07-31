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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdValidationGuard } from 'src/guards/mongo-id-validation.guard';
import { DuplicateValidationPipe } from './pipes/duplicate-validation.pipe';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { UserRoles } from 'src/auth/enums/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserDto } from './dto/user.dto';

@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer (token)',
})
@ApiTags('Users')
@UseGuards(RolesGuard)
@Roles(UserRoles.admin)
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(DuplicateValidationPipe)
  @ApiResponse({ status: 201 })
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: GetUserDto, isArray: true })
  @ApiOperation({ summary: 'Find all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(MongoIdValidationGuard)
  @ApiResponse({ status: 200, type: GetUserDto })
  @ApiOperation({ summary: 'Find one user' })
  @ApiBadRequestResponse({
    description: 'Ilegal format of ID',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  @UsePipes(DuplicateValidationPipe)
  @UseGuards(MongoIdValidationGuard)
  @ApiResponse({ status: 200 })
  @ApiBadRequestResponse({
    description: 'Ilegal format of ID',
  })
  @ApiOperation({ summary: 'Update by user id' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(MongoIdValidationGuard)
  @ApiResponse({ status: 204 })
  @ApiBadRequestResponse({
    description: 'Ilegal format of ID',
  })
  @ApiOperation({ summary: 'Delete by id user' })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
