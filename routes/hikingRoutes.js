const express = require('express')
const router = express.Router()
const HikingRoutes = require('../models/Hiking')
const hikingController = require("../controllers/hikingController")
const jwt_decode = require('jwt-decode')
const user = require("../models/User")

    router.post('/add', async function (req, res) {
        try {
            const decodedToken = jwt_decode(req.cookies.jwt)
            const hiking = await new HikingRoutes({
                name: req.body.name,
                title: req.body.title,
                program: req.body.program,
                organizer: req.body.organizer,
                userId: decodedToken.id
                //participants: req.body.participants
            }).save()
            user.findById(decodedToken.id, function(err, user) {
                if(user)
                {
                    user.hikings.push(hiking._id)
                    user.save()
                }
            })
            res.status(201)
            res.send(hiking)
            console.log("the HikingRoutes is added successfully with status code: " + res.status())
        } catch (err) {
            console.log(err)
            res.send(err.status)
        }
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


    // add the id of participants to hiking
    router.put('/participate', async function (req, res) {
        try {
            const decodedToken = jwt_decode(req.cookies.jwt)
            HikingRoutes.findById(req.query.hikingId,function (err, hiking){
                if (hiking)
                {
                    const idOccurrence = hiking.participants.filter((v) => (v == decodedToken.id)).length
                    if (idOccurrence >= 1)
                    {
                        console.log('idOccurrence: '+idOccurrence)
                        res.status(400).json({"message":"the id is already exists"})
                        //res.send()
                    }
                    else
                    {
                        console.log('idOccurrence: ' + idOccurrence)
                        hiking.participants.push(decodedToken.id)
                        hiking.save()
                        res.send(hiking)
                    }
                }
            })
        } catch (err) {
            console.log(err)
            res.send(err.status)
        }
    })


module.exports = router