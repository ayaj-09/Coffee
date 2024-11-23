const coffeeRouter = require('express').Router()
const Coffee = require('../models/Coffee')
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
  destination:'uploads/',
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
  }
})

const upload = multer({storage})

coffeeRouter.post('/',upload.single('image'),(req,res)=>{

  let image_filename=`${req.file.filename}`
  const coffee = new Coffee({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    image:image_filename
  })

  coffee.save()
  .then(result =>{
    res.json(result)
  })
  .catch(error=>{
    console.log(error)
  })

})

coffeeRouter.get('/',async(req,res)=>{
  try{
    const lists = await Coffee.find({})
    res.json(lists)
  }
  catch(error){
    res.json({error})
  }
})

coffeeRouter.delete('/:id',async(req,res)=>{
  try{
    const coffee = await Coffee.findByIdAndDelete(req.params.id)
    if(!coffee){
      return res.status(404).send('already deleted')
    }
    fs.unlink(`uploads/${coffee.image}`,()=>{})
    res.status(204).end()
  }
  catch(error){
    res.status(400).send('malformed id')
  }
})

module.exports = coffeeRouter