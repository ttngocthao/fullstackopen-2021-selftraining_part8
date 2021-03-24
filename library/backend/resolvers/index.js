const bcrypt = require('bcrypt')
const { UserInputError } = require('apollo-server')
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
    allAuthors: authorResolver.allAuthors
  },
  Mutation:{
    addAuthor: async(root,args)=>{
      const newAuthor = new Author({...args})
      try {
        await newAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message,{invalidArgs: args})
      }
      return newAuthor
    },
    addBook: async(root,args)=>{     
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
    editAuthor: async(root,args)=>{
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
    }
  },
  Author: {      
    bookCount:async(root)=>{ 
      const books = await Book.find({author: root._id}).populate('author')
      return books.length
    } 
  },

}