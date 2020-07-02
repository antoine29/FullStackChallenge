# Backend BlogList application

## Runnig the application
Navigate to the `part4/blogList/` folder and:

This node application works with a mongodb as a persistency layer so you'll need set the next values (mongoUrlConnection and node application port) in a `.env` file at the root of this project.
```
MONGODB_URI='mongodb+srv://someUser:somePassword@someMongoUrlConnection'
TEST_MONGODB_URI='mongodb+srv://someUser:somePassword@someMongoUrlConnection'
PORT=3001
SECRET='secretPairValue'
```
Where the first uri fields are the mongo url connections for the application and testing collections, the application port and a the secret string for token generation.

Run the application with:
```
$ npm install
$ npm run dev
```

## Code linting
Check the code lint with:
```
$ npm run lint
```

## Unitesting / integration tests
There is a set of unitests and integration tests, run them with:
```
$ npm run test
```