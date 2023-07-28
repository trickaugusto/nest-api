import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environments';
import { UserJwtPayload } from '../dto/user-jwt-payload.interface';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.JWT_SECRET,
    });
  }

  async validate(payload: UserJwtPayload): Promise<User> {
    const { username } = payload;
    const users: User[] = await this.authService.getUsers(username);
    const user: User = users[0];

    if (Object.keys(users).length <= 0) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
