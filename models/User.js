const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
  firstName:{
    type:String,
    required: true
  },
  lastName:{
    type:String,
    required: true
  },
  registeredDate:{
    type: Date,
    required:true,
    default: Date.now()

  }
})

module.exports = mongoose.model('User',userSchema)