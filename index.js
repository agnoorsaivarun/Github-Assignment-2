const express = require('express')
const mongoose = require('mongoose')
var jwt = require('jsonwebtoken');

const registerRoute = require('./routers/registerRoute')
const loginRoute = require('./routers/loginRoute')
const posts = require('./routers/postRoute')

const app = express()

mongoose.connect("mongodb://localhost/assignment")

app.post("/posts",async (req, res, next)=>{
    try {
        const token = req.headers.authorization
        if(token){
          jwt.verify(token,'secret',(err,decoded)=>{
             if(err) return res.status(400).json({status:err.message})
             req.user=decoded.data
          })
          next()
        }
        else  res.json({status: "token is not there"})    
    } catch (error) {
        res.json({
            failure: error.message
        })
    }
})

app.use('/posts', posts)
app.use('/register', registerRoute)
app.use('/login', loginRoute)

app.listen(3000, () => { console.log("server is running at 3000 port") })