const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
    type Author {
        id: ID!
        name: String!
        born: Int,
        bookCount: Int
    }

    type Book {
        id: ID!
        title: String!
        published: Int
        author: String!
        genres: [String!]
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
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

`

const booksFilter = args => {
    let filteredBooks = [... books]
    if(args.author) filteredBooks = filteredBooks.filter(book => book.author === args.author)
    if(args.genre)
        filteredBooks = filteredBooks.filter(book => book.genres.find(genre => genre.toLowerCase() === args.genre.toLowerCase()))
    
    return filteredBooks
}

const resolvers = {
    Author: {
        bookCount:(root) =>
            books.filter(book => book.author === root.name).length
    },
    Query: {
        authorCount: () => authors.length,
        bookCount: () => books.length,
        allBooks: (root, args) => booksFilter(args),
        allAuthors: () => authors
    },
    Mutation: {
        addBook: (root, args) => {
            if (!authors.find(author => author.name === args.author))
                authors = authors.concat({name: args.author, id: uuid()})
    
            const newBook = { ...args, id: uuid() }
            books = books.concat(newBook)
            return newBook
        },
    
        editAuthor: (root, args) => {
            const author = authors.find(author => author.name === args.name)
            if (!author) return null
            const updatedAuthor = { ...author, born: args.born }
            authors = authors.map(author => author.author === args.author ? updatedAuthor : author)
            return updatedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})