import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class CheckUserExistValidationPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(createPostDto: CreatePostDto) {
    const { author_id } = createPostDto;

    if (!author_id) {
      return createPostDto;
    }

    if (!mongoose.Types.ObjectId.isValid(author_id)) {
      throw new BadRequestException('Ilegal format of ID');
    }

    const author = await this.userService.findOne(author_id);

    if (!author) {
      throw new BadRequestException("author_id doesn't exists");
    }

    return createPostDto;
  }
}
