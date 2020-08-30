import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id,
    title,
    published,
    author {
      ...AuthorDetails,
    },
    genres
  }
`

export const ALL_AUTHORS = gql`
query allBooks {
  allAuthors{
    ...AuthorDetails,
    bookCount
  }
}
${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
query allBooks {
  allBooks{
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ALL_BOOKS_FILTERED = gql`
query allBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre){
    id,
    title,
    published,
    author {id, name, born},
    genres
  }
}
`
export const ALL_BOOKS_GENRES = gql`
query allBookGenres {
  allBookGenres
}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres) {
    id,
    title,
    published,
    author {
      id,
      name,
      born
    },
    genres
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    born: $born) {
    ...AuthorDetails
    bookCount
  }
}
${AUTHOR_DETAILS}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const CURRENT_USER = gql`
query me {
  me {
    id,
    username,
    favoriteGenre
  }
}
`