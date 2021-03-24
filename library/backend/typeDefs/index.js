const {  gql } = require('apollo-server')

module.exports= gql`
  
  type Book {
      title: String!
      author: Author!
      published: Int!
      genres:[String!]!
      id: ID!
  }

  type Author {
      name: String!
      born: Int
      id: ID!
      bookCount: Int!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String,genre:String): [Book]
      allAuthors: [Author]
      
  }
  
  type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres:[String!]!
      ):Book
      editAuthor(
        name: String!
        born: Int
      ):Author
      addAuthor(name: String!, born: Int): Author
  }
`

