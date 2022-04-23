const express = require('express');
const router = express.Router();
const MonumentRoutes = require('../models/Monument');
const monumentController = require("../controllers/monumentController")


    router.post('/add', async function (req, res) {
        try {
            const monument = await new MonumentRoutes({
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                location: req.body.location
            }).save()
            res.status(201)
            res.send(monument)
        } catch (err) {
            console.log(err)
            res.send(err.status)
        }
    })


    router.get("/list", function (req, res) {
        MonumentRoutes.find(function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log(docs)
                res.send(docs)
            }
        })
    })


    router.delete("/delete/:id", async function (req, res) {
        try {
            await MonumentRoutes.remove({_id: req.params.id})
            console.log("MonumentRoutes deleted successfully")
            res.send("MonumentRoutes deleted successfully")
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    })


    router.put("/update/:id", async function (req, res) {

        try {
            const monument = await MonumentRoutes.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                location: req.body.location
            })
            console.log("MonumentRoutes updated successfully")
            res.status(201)
            res.send(monument)
        } catch (err) {
            console.log(err)
            res.send("Error updating monument !!")
        }
    })


    router.get('/', monumentController.monument_view)


module.exports = router
