const express = require('express');
const router = express.Router();
const MuseumRoutes = require('../models/Museum');
const {museum_get} = require("../controllers/museumController");
const museumController = require("../controllers/museumController")


router.post('/add', async function (req, res) {
    try {
        const museum = await new MuseumRoutes({
            name: req.body.name,
            governorate: req.body.governorate,
            description: req.body.description,
            image: req.body.image,
            location: req.body.location
        }).save()
        res.status(201)
        res.send(museum)
    }
    catch (err)
    {
        console.log(err)
        res.send(err.status)
    }
})


router.get("/list",function(req,res){
    MuseumRoutes.find(function(err, docs){
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


router.delete("/delete/:id",function(req,res){
   MuseumRoutes.remove({_id:req.params.id},async function (err) {

       try
       {
           await MuseumRoutes.remove({_id: req.params.id})
           console.log("MuseumRoutes deleted successfully")
           res.send("MuseumRoutes deleted successfully")
       }
       catch (err)
       {
           res.send(err)
           console.log(err)
       }

   })
})


router.put("/update/:id",async function (req, res) {

    try {
        const museum = await MuseumRoutes.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            governorate: req.body.governorate,
            description: req.body.description,
            image: req.body.image,
            location: req.body.location
        })
        console.log("MuseumRoutes updated successfully")
        res.status(201)
        res.send(museum)
    } catch (err) {
        console.log(err)
        res.send("Error updating museum !!")
    }
}) 


router.get('/', museumController.museum_get)


module.exports = router