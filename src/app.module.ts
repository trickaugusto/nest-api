import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    DatabaseModule,
    AuthModule,
    JwtModule,
    PassportModule,
  ],
  controllers: [],
  providers: [AuthService, PassportModule],
  exports: [JwtModule],
})
export class AppModule {}
