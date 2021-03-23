const { UserInputError } = require('apollo-server')
let authors = require('../mockData/authors')
let books = require('../mockData/books')
const { v4: uuid } = require('uuid');

module.exports = {
  Query: {
    bookCount: ()=> books.length,
    authorCount: ()=> authors.length,
    allBooks: (root,args)=>{
      if(args.author){
        return books.filter(b=>b.author=== args.author)
      }
      if(args.genre){
        return books.filter(b=>b.genres.indexOf(args.genre)>-1)
      }
      return books
    },
    allAuthors: ()=> authors
  },
  Mutation:{
    addBook: (root,args)=>{
      const newBook = {...args,id: uuid()}
     
      if(typeof(args.published)!== number){
         throw new UserInputError('Published year must be a number',{
          invalidArgs: args.published,
        })  
      }
      
      if(!authors.find(a=>a.name ===args.author)){
         //!create new author
        const newAuthor = {name: args.author,id:uuid()}
        authors = [...authors,newAuthor]       
      }
      books = [...books, newBook]
      return newBook
    },
    editAuthor: (root,args)=>{
      //! if the author exists
      const author = authors.find(a=>a.name === args.name)
      if(!author){
        throw new UserInputError('Author is not existed',{
          invalidArgs: args.name,
        })       
      }
      const updatedAuthor = {...author, born:args.setBornTo}
      authors = authors.map(a=>a.name===args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  },
  Author: {      
    bookCount:(root)=>{ return books.filter(b=> b.author === root.name).length } 
  }
}