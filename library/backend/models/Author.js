const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const authorSchema = new mongoose.Schema({
    name: {type: String,required: true,unique:true},
    born: {type: Int, required: false},
})

authorSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Author',authorSchema)