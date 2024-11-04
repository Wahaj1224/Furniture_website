const express = require('express');
const {Product} = require('../models/shopmodel');
const router = express.Router();
const multer  = require('multer')
// const {Subscribe} = require('../models/homemodel');
//for admin to post products 
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





router.post(`/product`,upload.single('product_image'), (req, res) =>{
      
    // console.log('product_image:',  req.body.product_image);
    
     const filename=req.file.filename
     const basePath=`${req.protocol}//${req.get('host')}/public/upload/`;

    const product = new Product({
        product_image: `${basePath}${filename}`, //http://localhost:5000/public/upload/image-2342
        product_name: req.body.product_name,
        product_price:req.body.product_price
    
    })

    product.save().then((createdProduct=> {
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

//for admin to get subscriber


//for shop page fetching content from database
//gettinng all the products 
router.get(`/content`, async (req, res) =>{
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})



// getting single product
router.get(`/content/:id`, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports =router;