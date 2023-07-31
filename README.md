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
All routes have JWT Guard, to access this routes, you need authenticate in signin route, get accessToken and send like bearer token in header.

About the authorization, see all roles in src/auth/enums/user-roles.enum
### Users routes
Only Admins can be use this route.

### Posts routes


## Routes
OBS: All routes was protected with guards that validate if id is an ID of mongo. See more in mongo-id-validation.guard.ts

### AUTH:
`POST /auth/signup`: Route to create users.  
OBS: Only admin can be create users. 
   
Request infos:
```javascript
{
  "username": "username",
  "nickname": "nickname",
  "password": "password",
  "email": "test@gmail.com",
  "role": 2
}
```

`post /auth/signin`: Authentication and get accessToken.  
   
Request infos:
```javascript
{
	"username": "username",
	"password": "password"
}
```

### USERS:
`GET /users`: List all users   
`GET /users/:id`: List a specific user   
`DELETE /users/:id`: Delete a specific user   
`UPDATE /users/:id`: Update infos in a specific user. The request infos is the same as for the POST route, but you want pass only the info you need to update.   

`POST /users`: Create a user, using request infos like this:   
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
`GET /posts`: List all posts   
`GET /posts/:id`: List a specific post   
`DELETE /posts/:id`: Delete a specific post   
`UPDATE /posts/:id`: Update infos in a specific post. The request infos is the same as for the POST route, but you want pass only the info you need to update.   
`GET /posts/author/:id`: Get all posts by author_id  

`POST /posts`: Create a post, using request infos like this:
```javascript
{
	"title": "Title of post",
  "content": "Content of post",
  "image": "https://i.pinimg.com/550x/00/67/8c/00678c2b5ed4661958f5437f0f8f0513.jpg",
  "author_id": "64c16e2c750850c9ea1e4427",
  "tags": ["Family", "Childrens", "Parents"]
}
```