const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const coffeeRouter = require('./controllers/coffees')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const orderRouter = require('./controllers/orders')

const uri = config.MONGODB_URI

mongoose.set('strictQuery',false)
console.log('Connecting to MONGODB')
mongoose.connect(uri)
.then(result=>{
  console.log('Connected to MONGO DB')
})
.catch(error=>{
  console.log('error while connectin to MONGODB',error)
})


app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)


app.use('/api/coffee',coffeeRouter)
app.use('/images',express.static('uploads'))
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)

module.exports = app