const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const monumentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
})

const Monument =  mongoose.model('monument', monumentSchema)

module.exports = Monument