const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt')

const userModel=require('../models/userSchema')
app.use(bodyParser.json())

app.post("/", async (req,res)=>{
    const { name, email, password } = req.body
    try {
        if(name && email && password){
            bcrypt.hash(password,8,async (err,hash)=>{
                if(err) return res.status(400).json({failure:err})
                const newUser = await userModel.create({
                    name: name,
                    email: email,
                    password: hash
                })
                return res.status(200).json({
                    message:"user registered successfully",
                    newUser
                })
            })
        }
        else return res.status(400).json({message:"input credentials can't be empty"})
    } catch (error) {
        return res.status(400).json({
            failure: error.message
        })
    }
})

module.exports=app