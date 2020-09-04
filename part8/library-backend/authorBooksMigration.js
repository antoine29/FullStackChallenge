const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 's3cr37'
const pubsub = new PubSub()

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const BookFilters = require('./BookFilters')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = 'mongodb://localhost:27017/library-app?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => { console.log('connected to MongoDB') })
    .catch((error) => { console.log('error connection to MongoDB:', error.message) })

const authorBooksMigration = async () => {
    const books = await Book.find({})
    for (const book of books) {
        let author = await Author.findById(book.author)
        console.log('----------------')
        console.log(`book: ${book.title} authorId: ${book.author}`)
        console.log(`author: ${author.name} authorId: ${author.id}`)
        author.books = author.books.concat(book.id)
        await author.save()
        console.log('----------------')
    };
    
    console.log('end')
}

authorBooksMigration()