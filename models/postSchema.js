const mongoose = require('mongoose')

const id = mongoose.Schema.ObjectId

const userSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    image: { data: String },
    user: { type: id, ref: "User" }
});

const Posts = mongoose.model('Post', userSchema)

module.exports = Posts