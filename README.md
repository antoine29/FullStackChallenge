# FullStack dev challenge
## Heroku live deployment
### [Phonebook backend API](https://tranquil-escarpment-08399.herokuapp.com/api/persons)
`https://tranquil-escarpment-08399.herokuapp.com/api/persons`

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

## Repository/folder structure
```
FullStackChallenge/
└───part0/
│   │   ...
└───part1/
│   └───anecdotes/
│   └───courseinfo/
│   └───unicafe/
└───part2/
│   └───countries/
│   └───courseinfo/
│   └───phonebook/
└───part3/
│   └───phoneBookBackend/
│   README.md
│   .gitignore
```

## Frontend phonebook application
Navigate to the `part2/phonebook/` folder
```
$ npm install
$ npm start
```

## Backend phonebook application
Navigate to the `part3/phoneBookBackend/` folder
```
$ npm install
$ npm run dev
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