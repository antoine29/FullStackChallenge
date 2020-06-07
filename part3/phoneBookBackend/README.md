# Backend Phonebook application
Navigate to the `part3/phoneBookBackend/` folder and:

This node application works with a mongodb as a persistency layer so you'll need set the next values (mongoUrlConnection and node application port) in a `.env` file at the root of this project.
```
MONGODB_URI='mongodb+srv://someUser:somePassword@someMongoUrlConnection'
PORT=3001
```

Run the application with:
```
$ npm install
$ npm run dev
```

## Heroku live deployment
You may test (using postman, curl or another tool) the API endpoints in the next url: 

`https://tranquil-escarpment-08399.herokuapp.com/api/persons`

The request/response for a `GET:/api/persons` request should look like:
```
$ curl https://tranquil-escarpment-08399.herokuapp.com/api/persons | json_pp 
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--
  100   223  100   223    0     0    275      0 --:--:-- --:--:-- --:--:--   275
[
   {
      "id" : 1,
      "name" : "Arto Hellas",
      "number" : "040-123456"
   },
   {
      "id" : 2,
      "name" : "Ada Lovelace",
      "number" : "39-44-5323523"
   },
   {
      "id" : 3,
      "name" : "Dan Abramov",
      "number" : "12-43-234345"
   },
   {
      "id" : 4,
      "name" : "Mary Poppendieck",
      "number" : "39-23-6423122"
   }
]

```

## Heroku backend deployment
Since the folder structure includes the frontend and backend folders/projects for the phonebook application in one single git respository, in order to make a heroku deployment for the backend project/folder you'll need to use a git subtree feature as follows.

`Note: All these commands are executed from the root folder (FullStackChallenge/)`

```
$ heroku create
$ git subtree push --prefix part3/phoneBookBackend heroku 
$ heroku logs --tail
```
In this way you are deploying only the content of the `part3/phoneBookBackend` folder to the dyno heroku instance.

`Note: You'll have to set the .env values as config vars in your heroku dyno instance`

`Note: For the mongo url connection string, you must set it without the quote characters ('...')`

Alternatively you can use the `$ npm run deploy:full` command to launch a full deployment (frontend/backend) to the heroku instance.