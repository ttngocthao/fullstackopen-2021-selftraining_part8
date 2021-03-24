const Book = require('../models/Book')
const Author = require('../models/Author')

const  bookCount = () => Book.collection.countDocuments()

const allBooks = async(root,args)=>{
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
    }

    
module.exports = {bookCount,allBooks}