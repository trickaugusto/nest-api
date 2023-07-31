import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { DuplicateValidationPipe } from 'src/users/pipes/duplicate-validation.pipe';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/ user-auth-credentials.dto';
import { UserRoles } from './enums/user-roles.enum';
import { Roles } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authCredentialsDto);
  }

  @Post('/signup')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRoles.admin)
  @UsePipes(DuplicateValidationPipe)
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }
}
