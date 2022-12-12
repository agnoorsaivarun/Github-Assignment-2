const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userModel = require('../models/userSchema')
app.use(bodyParser.json())

app.post("/",async (req,res)=>{
    const { email, password } = req.body
    try {
        const user=await userModel.find({email:email})
        if(user){
            bcrypt.compare(password,user.password, (e,result)=>{
               if(e) return res.status(400).json({message:"login failed"})
               if(result){
                const token=jwt.sign({
                    exp: Math.floor(Date.now()/1000)+ (60*60),
                    data:user
                },'secret')
                res.status(200).json({
                    status: "success",
                    token: token
                })
               }
               else return res.json({message:"invalid credentials"})   
            })
        }
        else return res.status(404).json({message:"user not found"})
    } catch (error) {
        return res.status(400).json({message:error})
    }
})

module.exports=app