const express = require('express');
const router = express.Router();
const user = require('../models/User');


    router.post('/add', async function(req, res) {
        try {
            const u = await new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birthDate: (new Date(req.body.birthDate).getMonth() + 1) + "-" + new Date(req.body.birthDate).getDate() + "-" + (new Date(req.body.birthDate).getFullYear()),
                country: req.body.country,
                password: req.body.password
            }).save()
            res.status(201)
            res.send(u)
        }
        catch (err)
        {
            res.status(400)
            res.send("error: user cannot be added !!!")
        }

    })


    router.get("/",function(req,res){
        user.find(function(err,docs){
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
       user.remove({_id:req.params.id},function(err){
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log("user deleted successfully")
            }
        })
    })


    router.put("/update/:id",function(req,res){

        user.findByIdAndUpdate(req.params.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthDate: req.body.birthDate,
            country: req.body.country,
            password: req.body.password
        },function(err){
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log("user updated successfully")
            }

        })
    })


module.exports = router