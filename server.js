const express = require('express')
const app =  express()
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('connected to DB'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users',usersRouter)



app.listen(process.env.PORT,()=>{
  console.log('server started...')
})