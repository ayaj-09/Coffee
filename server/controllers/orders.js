const orderRouter = require('express').Router()
const Order = require('../models/Order')
const middleware = require('../utils/middleware')


orderRouter.get('/',middleware.tokenDecoder,async (req,res)=>{
  console.log('route handler')
  try{
    const orders = await Order.find({userId:req.user.id})
    res.json(orders)
  }
  catch(error){
    res.status(500).json({error:'something went wrong'})
  }
})

orderRouter.get('/all',async(req,res)=>{
  try{
    const allOrders = await Order.find({})
    res.json(allOrders)
  }
  catch(error){
    res.status(400).json({error:'error while fatching orders'})
  }
})

orderRouter.post('/',middleware.tokenDecoder,async(req,res)=>{
  try{
    const body = req.body
    const order = new Order({
      userId:req.user.id,
      ...body
    })
    await order.save()
    res.json(order)
  }
  catch(error){
    res.status(400).json({error})
  }
})

orderRouter.put('/:id',async(req,res) => {

})

module.exports = orderRouter