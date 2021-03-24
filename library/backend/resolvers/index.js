const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserInputError,AuthenticationError } = require('apollo-server')
const bookResolver = require ('./book.resolver')
const authorResolver = require('./author.resolver')

const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')

module.exports = {
  Query: {
    bookCount: bookResolver.bookCount,
    allBooks: bookResolver.allBooks,
    authorCount: authorResolver.authorCount,   
    allAuthors: authorResolver.allAuthors,
    me: (root,args,context)=>{
      return context.currentUser
    }
  },
  Mutation:{
    addAuthor: async(root,args,)=>{  

      const newAuthor = new Author({...args})
      try {
        await newAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message,{invalidArgs: args})
      }
      return newAuthor
    },
    addBook: async(root,args,{currentUser})=>{   
       if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      } 
      let author = await Author.findOne({name: args.author})
      let newBook
      try {
        if(!author){        
          const newAuthor = new Author({name: args.author})
          author = await newAuthor.save()
        } 
        newBook = new Book({...args,author: author}) 
        await newBook.save()
      } catch (error) {
         throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
     
      return newBook
    },
    editAuthor: async(root,args,{currentUser})=>{
       if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      } 
      let author
      try {
         author = await Author.findOneAndUpdate({name: args.name},{...args},{new: true})
         if(!author){
          throw new UserInputError('Author is not existed',{
            invalidArgs: args.name,
          })       
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }     
      
      return author
    
    },
    createUser: async(root,args)=>{
      //args =username: String!,password:String!,favoriteGenre:String!
      //username:"Anousmyus",password:"123456"
      //check username exist?
      let user = await User.findOne({username:args.username})
      
      //if exist, return error message
      if(user){
        throw new UserInputError('Username exists',args.username)
      }
      //if not, hashed password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password,saltRounds)
      //create new user
      user = new User ({
        username: args.username,
        passwordHash: passwordHash,
        favoriteGenre: args.favoriteGenre
      })
      //save to database
      return (await user).save()
    },
    login: async(root,args)=>{
      //check user exists
      let user = await User.findOne({username: args.username})
      if(!user){
        throw new UserInputError('User or password is not corrected',{...args})
      }
      //check password matched using compare method
      const passwordMatched = await bcrypt.compare(args.password,user.passwordHash)
      if(!passwordMatched){
        throw new UserInputError('User or password is not corrected',{...args})
      }

      //generate token using username and id
      const infoUsedForToken ={
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(infoUsedForToken,process.env.TOKEN_SECRET)
      return {value: token}
    }
  },
  Author: {      
    bookCount:async(root)=>{ 
      const books = await Book.find({author: root._id}).populate('author')
      return books.length
    } 
  },

}