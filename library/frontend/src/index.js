import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient,ApolloProvider, HttpLink, InMemoryCache , split} from '@apollo/client'
import {setContext} from 'apollo-link-context'

//?-->for subscription
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

//?-->add token to authorization header
const authLink = setContext((_,{headers})=>{
  const token =localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000'})

//?-->for subscription
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

//?-->for subscription
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

//?--> create an instance of a client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink) 
})


ReactDOM.render( <ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'))