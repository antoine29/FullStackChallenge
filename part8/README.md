# GraphQL Library application

This application based in two components

1. Backend API. (GraphQL)
2. React based frontend (Apollo client)

## Runnig the backend

Navigate to the `~/FullStackChallenge/part8/library-backend` folder:

### You'll need to set up a mongoDB connection URL in the `library-backend.js` line #15
```
$ npm install
$ node library-backend.js
```

With the backend server runnig you could use the graphQL playGround application in `localhost:4000` to start testing the available graphQL queries/mutations defined by the application. You can check these queries in the `library-backend_queries.txt` file.

## Runnig the frontend

### You'll need the `library-backend` application running

Navigate to the `~/FullStackChallenge/part8/library-frontend` folder:
```
$ npm install
$ npm start
```

You'll have to create an user account using the `createUser` mutation using the graphQL playground application (or another tool like postman). 