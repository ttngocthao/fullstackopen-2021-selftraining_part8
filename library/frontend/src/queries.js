import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
      query {       
        allAuthors {
             name
             born
             bookCount
        }       
      }
`

export const ALL_BOOKS = gql `
    query {
       allBooks{
        title
        author{
          name
        }
        published
        genres
      }
    }
`

export  const CREATE_BOOK = gql`
  mutation createBook($title: String!,$author: String!, $published: Int!,$genres:[String!]!){
    addBook (
      title:$title,
      author:$author, 
      published:$published, 
      genres:$genres
      ) {
        id
        title
        author {
          id
          name
        }
        published
        genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation updateAuthor ($name:String!,$born:Int){
    editAuthor (
      name: $name,
      born: $born
    ){
      name
      born
      bookCount
    }
  }
`

export const LOG_IN = gql`
  mutation login($username:String!,$password:String!){
    login(username:$username,password:$password){
      value
    }
  }
`