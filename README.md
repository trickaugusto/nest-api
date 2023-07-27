<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS Api

## Description
Welcome to my Nest API. This is a POC.
In this project, exists POSTS and USERS records.

## Configuration
I used mongodb database. So, if you want to test this project, you need to create a database in mongo. 
In src/database/environments you need to create an environments.ts based in environments.example.ts.

I used code first. So, after created environments variables, let's go be happy!

## Running project
Clone the project:
```bash
git clone git@github.com:trickaugusto/nest-api.git
```

Go to project:
```bash
cd nest-api
```

Install all dependences:
```bash
yarn install
```

Run:
```bash
yarn start
```

## Tests
This topic is incomplete.

## Authorization and Authentication
This topic is incomplete.

## Routes
OBS: All routes was protected with guards that validate if id is an ID of mongo. See more in mongo-id-validation.guard.ts

### USERS:
/users -> GET: List all users
/users/:id -> GET: List a specific user
/users/:id -> DELETE: Delete a specific user
/users/:id -> UPDATE: Update infos in a specific user. The request infos is the same as for the POST route, but you want pass only the info you need to update.

/users -> POST: Create a user, using request infos like this:
```javascript
{
  "username": "outro",
  "nickname": "apelido_usuario",
  "password": "senha_usuario",
  "email": "email_outrouario@gmail.com",
  "role": 1
}
```
OBS: We accept only 3 roles: 1, 2, 3. See useEnum.ts.

### POSTS
/posts -> GET: List all posts
/posts/:id -> GET: List a specific post
/posts/:id -> DELETE: Delete a specific post
/posts/:id -> UPDATE: Update infos in a specific post. The request infos is the same as for the POST route, but you want pass only the info you need to update.
/posts/author/:id -> GET: Get all posts by author_id

/posts -> POST: Create a post, using request infos like this:
```javascript
{
	"title": "Title of post",
  "content": "Content of post",
  "image": "https://i.pinimg.com/550x/00/67/8c/00678c2b5ed4661958f5437f0f8f0513.jpg",
  "author_id": "64c16e2c750850c9ea1e4427",
  "tags": ["Family", "Childrens", "Parents"]
}
```