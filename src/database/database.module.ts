import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from 'src/environments/environments';

const user = environment.USER_MONGO;
const password = environment.PASS_MONGO;
const database = environment.DATABASE_NAME;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${user}:${password}@${database}.pujdnbh.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
})
export class DatabaseModule {}
