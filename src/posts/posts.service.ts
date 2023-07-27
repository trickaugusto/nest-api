import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto) {
    const createdPost = await this.postModel.create(createPostDto);
    return createdPost;
  }

  async findAll() {
    const allPosts = await this.postModel
      .find()
      .select('title content image tags author_id')
      .where('deletedAt')
      .equals(null);

    return allPosts;
  }

  async findOne(id: string) {
    const post = await this.postModel
      .findById(id)
      .select('title content image tags author_id')
      .where('deletedAt')
      .equals(null);

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedPost = this.postModel.updateOne({ _id: id }, updatePostDto);
    return updatedPost;
  }

  async delete(id: string) {
    const deletedPost = await this.postModel.findById(id);
    deletedPost.deletedAt = new Date();

    await deletedPost.save();
    return deletedPost;
  }

  async findAllPostsByAuthor(id: string) {
    const posts = await this.postModel
      .find()
      .select('title content image tags author_id')
      .where('author_id')
      .equals(id)
      .where('deletedAt')
      .equals(null);

    return posts;
  }
}
