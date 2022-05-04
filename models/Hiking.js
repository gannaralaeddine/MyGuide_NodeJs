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
    userId : {
        type: String
    },
    participants:[{ type: Schema.Types.ObjectId, ref:'User' }]
})

const Hiking =  mongoose.model('hiking', hikingSchema)

module.exports = Hiking