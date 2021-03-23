import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient,ApolloProvider, HttpLink, InMemoryCache, gql } from '@apollo/client'

//?--> create an instance of a client
const client = new ApolloClient({
  cache: new InMemoryCache(),
 link: new HttpLink({
    uri: 'http://localhost:4000',
  })
 
})

// //?--> create a query
// const query = gql`
//     query {       
//         allAuthors {
//             name
//             born
//             bookCount
//         }       
//     }
// `
// //?--> send the query to the server:

// client.query({ query })
//   .then((response) => {
//     console.log(response.data)
// }).catch(err=>{console.log('error',err)})

ReactDOM.render( <ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))