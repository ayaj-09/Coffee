const userRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const config = require('../utils/config')
const middleware = require('../utils/middleware')

const createToken = (id) =>{
  return jwt.sign({id},config.SECRET)
}

userRouter.post('/register',async(req,res)=>{
  try{
    const { name, email, password } = req.body
    const exist = await User.findOne({ email })
    if (exist) {
      return res.status(400).json({ error: 'User already exists' })
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email is not valid' })
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'password is too small' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: passwordHash
    })
    await newUser.save()
    const token = createToken(newUser._id)
    res.json({ token,cartData:newUser.cartData })
  }
  catch(error){
    console.log(error)
    res.status(500).end()
  }  
})


userRouter.post('/login',async(req,res)=>{
  try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({error:'User does not exist'})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({error:"Email or Password is incorrect"})
    }
    const token = createToken(user._id)
    res.json({token,cartData:user.cartData})
  }
  catch(error){
    console.log(error)
    res.status(500).json({error})
  }
})

userRouter.put('/',middleware.tokenDecoder,async(req,res)=>{
  try{
    const body = req.body
    console.log(body)
    console.log(req.user.id)
    const user = await User.findById(req.user.id)
    console.log(user)
    const result = await User.findByIdAndUpdate(req.user.id,{cartData:body},{new:true})
    console.log(result)
    res.json(result)
    
  }
  catch(error){
    console.log(error)
  }
})

userRouter.get('/cartData',middleware.tokenDecoder,async(req,res)=>{
  try{
    const user = await User.findById(req.user.id)
    res.json(user.cartData)
  }
  catch(error){
    res.status(500).json({error})
  }
})

module.exports = userRouter