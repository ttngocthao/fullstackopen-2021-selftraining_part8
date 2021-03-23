require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const resolvers = require ('./resolvers')
const typeDefs = require ('./typeDefs')

 mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(()=>{console.log('Connected to MongoDB')})
    .catch((error)=>{ console.log('error in connecting to MongoDB',error)})

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})