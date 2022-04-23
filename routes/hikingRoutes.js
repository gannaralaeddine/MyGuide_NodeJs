const express = require('express');
const router = express.Router();
const HikingRoutes = require('../models/Hiking');
const hikingController = require("../controllers/hikingController")


    router.post('/add', async function (req, res) {
        try {
            const hiking = await new HikingRoutes({
                name: req.body.name,
                title: req.body.title,
                program: req.body.program,
                organizer: req.body.organizer,
                participants: req.body.participants
            }).save()
            res.status(201)
            res.send(hiking)
            console.log("the HikingRoutes is added successfully with status code: " + res.status())
        } catch (err) {
            console.log(err)
            res.send(err.status)
        }
    })


    router.get("/list",function(req,res){
        HikingRoutes.find(function(err, docs){
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

        try {
            await HikingRoutes.remove({_id: req.params.id})
            console.log("HikingRoutes deleted successfully")
            res.send("HikingRoutes deleted successfully")
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    })


    router.put("/update/:id",async function (req, res) {

        try {
            const hiking = await HikingRoutes.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                title: req.body.title,
                program: req.body.program,
                organizer: req.body.organizer,
                participants: req.body.participants
            })
            console.log("HikingRoutes updated successfully")
            res.status(201)
            res.send(hiking)
        } catch (err) {
            console.log(err)
            res.send("Error updating hiking !!")
        }
    })


    router.get('/', hikingController.hiking_view)


module.exports = router