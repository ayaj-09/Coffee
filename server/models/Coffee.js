const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true,
  }
})

coffeeSchema.set('toJSON',{
  transform:(document,returnedObj)=>{
    returnedObj.id = String(returnedObj._id)
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Coffee',coffeeSchema)