const express = require('express');
const {Blog} = require('../models/blogmodel');
const router = express.Router();
const multer  = require('multer');
// const authJwt=require('../helper/jwt');

//for admin to post blogs
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


  

router.post(`/blog`,upload.single('blog_image'), (req, res) =>{
      
    // console.log('blog_image:',  req.body.blog_image);
    const filename=req.file.filename;
    const basePath=`${req.protocol}//${req.get('host')}/public/upload/`;

    const blog = new Blog({
        blog_image: `${basePath}${filename}`,
        blog_name: req.body.blog_name,
        blog_author:req.body.blog_author,
        blog_date:req.body.blog_date,
        blog_body:req.body.blog_body
 
    })

    blog.save().then((createdblog=> {
        res.status(201).json(createdblog)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})


router.get(`/blog_content`, async (req, res) =>{
    const blog_List = await Blog.find();

    if(!blog_List) {
        res.status(500).json({success: false})
    } 
    res.send(blog_List);
})


router.get(`/blog_content/:id`, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'blog not found' });
        }
        res.send(blog);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports =router;