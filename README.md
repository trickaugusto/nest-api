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

# Documentation
After run project, you can access full swagger documentation:  
`http://localhost:3000/api`