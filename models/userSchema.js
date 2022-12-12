const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
})

const Models = mongoose.model('User', modelSchema)

module.exports = Models