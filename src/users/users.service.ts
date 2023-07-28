import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { AuthCredentialsDto } from '../auth/dto/ user-auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll() {
    const allUsers = await this.userModel
      .find()
      .select('username nickname email role')
      .where('deletedAt')
      .equals(null);

    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('username nickname email role')
      .where('deletedAt')
      .equals(null);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.userModel.updateOne({ _id: id }, updateUserDto);
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel.findById(id);
    deletedUser.deletedAt = new Date();

    await deletedUser.save();
    return deletedUser;
  }

  async findUserByUserName(username: string) {
    const user = await this.userModel
      .find()
      .where('username')
      .equals(username)
      .where('deletedAt')
      .equals(null);

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel
      .find()
      .where('email')
      .equals(email)
      .where('deletedAt')
      .equals(null);

    return user;
  }

  async userFindByNameAndMatchingPassword(
    AuthCredentialsDto: AuthCredentialsDto,
  ) {
    let user!: User;
    const filteredUsers = await this.findUserByUserName(
      AuthCredentialsDto.username,
    );

    for await (const userFiltered of filteredUsers) {
      if (
        await bcrypt.compare(AuthCredentialsDto.password, userFiltered.password)
      ) {
        user = userFiltered;
      }
    }

    return user;
  }
}
