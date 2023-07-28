import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserJwtPayload } from '../dto/user-jwt-payload.interface';
import { UserRoles } from '../enums/user-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles = this.reflector.get<UserRoles[]>(
      'roles',
      context.getHandler(),
    );

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.decode(
      this.extractTokenFromHeader(request),
    ) as UserJwtPayload;
    const userRole = token.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return false;
    }

    return true;
  }

  decode(token: string): UserJwtPayload {
    return this.jwtService.decode(token) as UserJwtPayload;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
