const mongoose = require('mongoose')
const userSchema = require('./User').UserSchema
const Schema = mongoose.Schema

const hikingSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    program:{
        type: String,
        required: true
    },
    organizer:{
        type: String,
        required: true
    },
    participants:{
        type: [userSchema],
        required: true
    }
})

const Hiking =  mongoose.model('hiking', hikingSchema)

module.exports = Hiking