const Book = require('../models/Book')
const Author = require('../models/Author')

const authorCount = ()=> Author.collection.countDocuments() 
const allAuthors =  ()=> Author.find({})

module.exports = {authorCount,allAuthors}