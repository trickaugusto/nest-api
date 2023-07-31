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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdValidationGuard } from 'src/guards/mongo-id-validation.guard';
import { DuplicateValidationPipe } from './pipes/duplicate-validation.pipe';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { UserRoles } from 'src/auth/enums/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(RolesGuard)
@Roles(UserRoles.admin)
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(DuplicateValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(MongoIdValidationGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(DuplicateValidationPipe)
  @UseGuards(MongoIdValidationGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(MongoIdValidationGuard)
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
