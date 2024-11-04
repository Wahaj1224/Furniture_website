const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema
const blogSchema = new Schema({
  blog_image: String,
  blog_name: String,
  blog_author: String,
  blog_date:{
    type: Date,
    default: Date.now
},
  blog_body:String
});

exports.Blog= mongoose.model('blog', blogSchema);