import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  createdBy: number;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('updateOne', function (next) {
  this.updateOne({}, { $set: { updatedAt: new Date() } });
  next();
});
