import { CreateUserDto } from '../dto/create-user.dto';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DuplicateValidationPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;

    const isUsernameDuplicate = await this.userService.findUserByUserName(
      username,
    );

    if (isUsernameDuplicate.length) {
      throw new BadRequestException('Username already exists');
    }

    const isEmailDuplicate = await this.userService.findUserByEmail(email);

    if (isEmailDuplicate.length) {
      throw new BadRequestException('Email already exists');
    }

    return createUserDto;
  }
}
