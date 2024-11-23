const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  items:{
    type:Array,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  address:{
    type:Object,
    required:true,
  },
  status:{
    type:String,
    default:"Coffee Processing"
  },
  date:{
    type:Date,
    default:Date.now()
  },
  payment:{
    type:Boolean,
    default:false
  }
})

module.exports = mongoose.model('Order',orderSchema)