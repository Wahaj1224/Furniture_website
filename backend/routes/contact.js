const express = require('express');
const {Contact} = require('../models/contactmodel');
const router = express.Router();

//for admin to post blogs


router.post(`/contact`, (req, res) =>{
      
    // console.log('blog_image:',  req.body.blog_image);
    


    const blog = new Contact({
        First_name: req.body.First_name,
        Last_name: req.body.Last_name,
        email:req.body.email,
        message:req.body.message,
        

    
    })

    blog.save().then((createdcontact=> {
        res.status(201).json(createdcontact)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
module.exports =router;