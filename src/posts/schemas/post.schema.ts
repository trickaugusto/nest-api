import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  author_id: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  createdBy: number;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre('updateOne', function (next) {
  this.updateOne({}, { $set: { updatedAt: new Date() } });
  next();
});
