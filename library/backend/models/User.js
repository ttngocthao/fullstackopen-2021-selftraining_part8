const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    passwordHash: {
      type:String,
      required: true,
    },
    favoriteGenre:{
        type:String,
        required: true
    }
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
  }
})
module.exports = mongoose.model('User',userSchema)