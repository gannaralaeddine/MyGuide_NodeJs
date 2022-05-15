const express = require('express');
const router = express.Router();
const user = require('../models/User');
const HikingRoutes = require('../models/Hiking')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) 
    {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) 
    {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
    {
        cb(null, true);
    } 
    else 
    {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

    router.post('/add',upload.single('profileImage'),async function(req, res) {
        try {
            const u = await new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birthDate: (new Date(req.body.birthDate).getMonth() + 1) + "-" + new Date(req.body.birthDate).getDate() + "-" + (new Date(req.body.birthDate).getFullYear()),
                country: req.body.country,
                password: req.body.password,
                profileImage: req.file.path
            }).save()
            res.status(201)
            res.send(u)
        }
        catch (err)
        {
            res.status(400)
            //res.send("error: user cannot be added !!!")
            res.send({error: err})
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

    /* I changed the router here to let the route "/user/hiking/" working well, 
    so please don't change it to another place*/

    router.get("/hiking",function(req,res){
        HikingRoutes.find({userId:req.query.userId},function(err,docs){
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

module.exports = router