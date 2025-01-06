const jwt = require("jsonwebtoken")
const config = require('./config')

const requestLogger = (req,res,next) => {
  console.log('Method',req.method)
  console.log('Body',req.body)
  console.log('path',req.path)
  console.log('---')
  next()
}

const tokenDecoder = (req,res,next) => {
  let token = req.headers['authorization']

  if(!token){
    return res.status(401).json({error:'token is missing'})
  }
  
    if(token.includes('Bearer ')){
      token = token.replace('Bearer ','')
    }
  
    const decode = jwt.verify(token,config.SECRET)
    
    req.user = decode
    next()
  
  
}

module.exports = {
  requestLogger,
  tokenDecoder
}