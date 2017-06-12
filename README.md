# shop cms backend

### setting up dev environment
#### create .env file
Create a .env file inside project directory. You can directly copy .env.example.
Set following variables to run on locally.

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION_NAME=
AWS_BUCKET_URL=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
JWT_SECRET=
PORT=
```

#### set up nodejs
install nodejs, use latest stable version.
You can use [nvm](https://github.com/creationix/nvm) to install latest stable version.

### set up mysql
setup mysql and create a fresh database

#### install local dependencies
`npm install`

#### run the application
`npm start`

### deploying application
Application deployment is heroku compatible 
