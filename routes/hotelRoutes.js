const express = require('express');
const router = express.Router();
const HotelRoutes = require('../models/Hotel');
const hotelController = require('../controllers/hotelController')

router.post('/add', async function (req, res) {
    try
    {
        const hotel = await new HotelRoutes({
            name: req.body.name,
            location: req.body.location,
            image: req.body.image,
            rating: req.body.rating,
            governorate: req.body.governorate,
            description: req.body.description
        }).save()
        res.status(201)
        res.send(hotel)
    }
    catch (err)
    {
        console.log(err)
        res.send(err.status)
    }
})

router.get("/list",function(req,res){
    HotelRoutes.find(function(err, docs){
        if (err) 
        {
            console.log(err)
        }
        else
        {
            console.log(docs)
            res.send(docs)
        }
    })
})

router.delete("/delete/:id",async function (req, res) {

    try
    {
        await HotelRoutes.remove({_id: req.params.id})
        console.log("hotel deleted successfully")
        res.send("hotel deleted successfully")
    }
    catch (err)
    {
        res.send(err)
        console.log(err)
    }
})

router.put("/update/:id",async function (req, res) {

    try
    {
        const hotel = await HotelRoutes.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            location: req.body.location,
            image: req.body.image,
            rating: req.body.rating,
            governorate: req.body.governorate,
            description: req.body.description
        })
        console.log("hotel updated successfully")
        res.status(201)
        res.send(hotel)
    }
    catch (err)
    {
        console.log(err)
        res.send("Error updating hotel !!")
    }

})

router.get('/', hotelController.hotel_get)

module.exports = router