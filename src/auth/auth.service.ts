import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/ user-auth-credentials.dto';
import { UserJwtPayload } from './dto/user-jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username: string = authCredentialsDto.username;
    const user = await this.userService.userFindByNameAndMatchingPassword(
      authCredentialsDto,
    );

    if (user) {
      const role = user.role;
      const payload: UserJwtPayload = { username, role };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }

  async getUsers(username: string) {
    const user = this.userService.findUserByUserName(username);
    return user;
  }
}
