import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { SharedModule } from 'src/shared.module';
import { CheckUserExistValidationPipe } from './pipes/check-exist-user-validation.pipe';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
    JwtModule,
    PassportModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, CheckUserExistValidationPipe, PassportModule],
})
export class PostsModule {}
