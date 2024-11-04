const express = require('express');
const {About} = require('../models/aboutmodel');
// import { About } from "../models/aboutmodel";
const router = express.Router();
const multer  = require('multer')

const fileType= {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid=fileType[file.mimetype];
        let uploadError=new Error('invalid image type');
        if (isValid){
            uploadError=null;
        }
      cb(uploadError, 'public/upload')
    },
    filename: function (req, file, cb) {

      const filename= file.originalname.split(' ').join('-');
      const extension= fileType[file.mimetype];
      cb(null, `${filename}-${Date.now()}.${extension}`)
    }
  })
  
  const upload = multer({ storage: storage })

//for admin to post team
let simage;
router.post(`/about`,upload.single('simage'), (req, res) =>{


    // console.log('simage:', req.body.simage);
    // console.log('sname:', req.body.sname);
    // console.log('stitle:', req.body.stitle);
    // console.log('sdescription:', req.body.sdescription);
    const filename=req.file.filename
    const basePath=`${req.protocol}//${req.get('host')}/public/upload/`;


    const about = new About({

        simage:`${basePath}${filename}`,
        sname: req.body.sname,
        stitle: req.body.stitle,
        sdescription: req.body.sdescription

    })
   

    about.save().then((createdService=> {
        res.status(201).json(createdService)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

router.get(`/team`, async (req, res) =>{
    const teamList = await About.find();

    if(!teamList) {
        res.status(500).json({success: false})
    } 
    res.send(teamList);
})


module.exports =router;