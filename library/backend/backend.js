require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const resolvers = require ('./resolvers')
const typeDefs = require ('./typeDefs')
const User = require('./models/User')
 mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(()=>{console.log('Connected to MongoDB')})
    .catch((error)=>{ console.log('error in connecting to MongoDB',error)})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.TOKEN_SECRET
      )
      const currentUser = await User.findById(decodedToken.id,['username','_id'])
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})