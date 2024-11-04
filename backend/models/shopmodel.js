const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema
const productSchema = new Schema({
  product_image: {
    type: String,
    default: ''
},
  product_name: String,
  product_price: String
});

exports.Product= mongoose.model('product', productSchema);