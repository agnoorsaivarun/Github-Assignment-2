const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const postSchema = require('../models/postSchema')
app.use(bodyParser.json())

app.get("/",async (req,res)=>{
    const users=await postSchema.find()
    if(users.length) res.json({users})
    else res.json({message:"user has no posts"})
})

app.post("/",async (req,res)=>{
    try {
        const {title,body,image}=req.body
        if(title && body && image){
            const post=await postSchema.create({
                 title:title,
                 body:body,
                 image:image,
                 user: req.user      
            })
            res.status(200).json({
                status: "post created",
                data: post
            })
        }
        else  res.json({
            failure: "nothing to post",
        })
    } catch (error) {
        res.status(400).json({status:error.message})
    }
})

app.put('/:postsId', async (req, res) => {
    try {
        const data = await postSchema.updateOne({ _id: req.params.postsId }, { ...req.body })
        res.status(200).json({
            status: "success",
            updatedData: data
        })
    } catch (error) {
        res.status(400).json({
            status: error.message
        })
    }

})

app.delete('/:postsId', async (req, res) => {
    try {
        const data = await postSchema.deleteOne({ _id: req.params.postsId })
        if (data) {
            res.status(200).json({
                status: "post is deleted successfully",
            })
        } else {
            res.json({
                message: "nothing to delete"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: error.message
        })
    }
})

module.exports = app