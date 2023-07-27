import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import mongoose from 'mongoose';

@Injectable()
export class MongoIdValidationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Ilegal format of ID');
    }

    return true;
  }
}
