const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name:{ type: String, required: true },
    location:{ type: String, required: true },
    image:{ type: String, required: true },
    rating:{ type: Number, required: true, min: 1, max: 5 },
    governorate:{ type: String, required: true },
    description:{ type: String, required: true }
})

const Hotel =  mongoose.model('hotel', hotelSchema)

module.exports = Hotel