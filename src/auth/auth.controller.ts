import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { DuplicateValidationPipe } from 'src/users/pipes/duplicate-validation.pipe';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/ user-auth-credentials.dto';
import { UserRoles } from './enums/user-roles.enum';
import { Roles } from './guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'Signin user and get accessToken' })
  @ApiResponse({ status: 201, description: 'accessToken: accessToken' })
  @ApiUnauthorizedResponse({
    description: 'Incorrect login credentials!',
  })
  @ApiBadRequestResponse({
    description: 'Username already exists',
  })
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authCredentialsDto);
  }

  @Post('/signup')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer (token)',
  })
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRoles.admin)
  @UsePipes(DuplicateValidationPipe)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201 })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Username already exists',
  })
  signup(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signup(createUserDto);
  }
}
