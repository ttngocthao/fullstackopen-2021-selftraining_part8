const { UserInputError } = require('apollo-server')
let authors = require('../mockData/authors')

const { v4: uuid } = require('uuid');
const Book = require('../models/Book')
const Author = require('../models/Author')

module.exports = {
  Query: {
    bookCount: ()=> Book.collection.countDocuments(),
    authorCount: ()=> Author.collection.countDocuments(),
    allBooks: async(root,args)=>{
      const books = await Book.find({}).populate('author')
      //if author exist
      if(args.author){
        const author = await Author.findOne({name: args.author})
        return books.filter(b=>b.author.name === args.author)
      }
            
      if(args.genre){            
        return books.filter(b=>b.genres.indexOf(args.genre)>-1)
      }

      return books
    },
    allAuthors: ()=> Author.find({})
  },
  Mutation:{
    addAuthor: (root,args)=>{
      const newAuthor = new Author({...args})
      return newAuthor.save()
    },
    addBook: async(root,args)=>{     
      let author = await Author.findOne({name: args.author})

      if(!author){        
        const newAuthor = new Author({name: args.author})
        author = await newAuthor.save()
      } 
      const newBook = new Book({...args,author: author}) 
      return newBook.save()
    },
    editAuthor: async(root,args)=>{
      let author = await Author.findOneAndUpdate({name: args.name},{...args},{new: true})
      if(!author){
        throw new UserInputError('Author is not existed',{
          invalidArgs: args.name,
        })       
      }
      return author
    
    }
  },
  Author: {      
    bookCount:async(root)=>{ 
      const books = await Book.find({author: root._id}).populate('author')
      return books.length
    } 
  },

}