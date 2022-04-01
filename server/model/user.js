const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    admin: {type: Boolean, default: false},
    createDate: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Usuario', userSchema)