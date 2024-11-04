
const express = require('express');
const {Subscribe} = require('../models/homemodel');
const router = express.Router();



router.post(`/subscribe`, (req, res) =>{
    const subscribe = new Subscribe({
        name: req.body.name,
        email: req.body.email
    
    })

    subscribe.save().then((createdSubscribe=> {
        res.status(201).json(createdSubscribe)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports =router;