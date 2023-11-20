const express = require('express')
const User = require('../models/User')

const router = express.Router()
//Getting all
router.get('/',async (req,res)=>{
  try{
    const users = await User.find()
    res.send(users)
  }catch(err){
    res.status(500).json({message:err.message})
  }
  
})
//Getting one
router.get('/:id',getRegisteredUser,(req,res)=>{
  res.send(res.newUser.name)
})
//Creating one
router.post('/',async(req,res)=>{
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  try{
    const user = await newUser.save()
    res.status(201).json(user)
  }catch(err){
    res.status(400).json({message:err.message})
  }

})
//updating one
router.patch('/:id',getRegisteredUser, async(req,res)=>{
  if(req.body.firstName!= null){
    res.newUser.firstName = req.body.firstName
  }
  if(req.body.lastName!=null){
    res.newUser.lastName=req.body.lastName
  }
  try{
    const updatedUser = await res.newUser.save()
    res.json(updatedUser)
  }catch(err){
    res.status(400).json({message:err.message})
  }
  
})
//deleting one
router.delete('/:id',getRegisteredUser,async(req,res)=>{
  try{
    await User.deleteOne({_id:req.params.id})
    res.json({message:'Deleted User'})
  }catch(err){
    res.status(500).json({message:err.message})
  }
})

async function getRegisteredUser(req,res,next){
  let newUser
  try{
    newUser = await User.findById(req.params.id)
    if(newUser == null){
      return res.status(404).json({message:'Cannot find newUser'})
    }
  }catch(err){
    return res.status(500).json({message:err.message})
  }
  console.log('6555f4346f328aee42ff58dd')
  res.newUser = newUser
  next()
}


module.exports = router