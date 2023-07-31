import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CheckUserExistValidationPipe } from 'src/posts/pipes/check-exist-user-validation.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CheckUserExistValidationPipe, PassportModule],
  exports: [UsersService],
})
export class UsersModule {}
