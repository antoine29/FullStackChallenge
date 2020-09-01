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


const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author {
        id: ID!
        name: String!
        born: Int,
        bookCount: Int!
    }

    type Book {
        id: ID!
        title: String!
        published: Int
        author: Author!
        genres: [String!]
    }

    type Query {
        me: User
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        allBookGenres: [String!]!
    }

    type Mutation {
        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
        
        addBook(
            title: String!
            published: Int!
            author: String
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            born: Int!
        ): Author
    }

    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Author: {
        bookCount: async root => {
            const authorBooks = await Book.find({}).populate('author')
            return authorBooks.filter(book => book.author.name === root.name).length
        }
    },
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        },
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),
        allBooks: (root, args) => BookFilters.booksFilter(args),
        allAuthors: () => Author.find({}),
        allBookGenres: async () => await BookFilters.allGenres()
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) throw new AuthenticationError("not authenticated")
            try {
                let newBook = null
                let newAuthor = null
                const author = await Author.findOne({ name: args.author })
                if (author) console.log('found author:', author)
                else {
                    newAuthor = await new Author({ id: uuid(), name: args.author }).save()
                    console.log('new created author:', newAuthor)
                }

                newBook = await new Book({ ...args, id: uuid(), author: !author ? newAuthor.id : author.id }).save()
                let foundCreatedBook = await Book.findById(newBook.id).populate('author')
                console.log('created book', foundCreatedBook)
                pubsub.publish('BOOK_ADDED', { bookAdded: foundCreatedBook })
                return foundCreatedBook
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },

        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) throw new AuthenticationError("not authenticated")
            try {
                const author = await Author.findOne({ name: args.name })
                if (!author) return null
                author.born = args.born
                await author.save()
                return author
            }
            catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },

        createUser: (root, args) => {
            const user = new User({ ...args })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'password') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})