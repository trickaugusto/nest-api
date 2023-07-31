import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environments/environments';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = environment.APP_PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription(
      'Welcome to my Nest API. This is a POC. In this project, exists POSTS and USERS records.',
    )
    .setVersion('1.0')
    .addTag('Posts', 'Endpoints related to posts')
    .addTag('Users', 'Endpoints related to users')
    .addTag('Auth', 'Authentication and authorization endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap();
