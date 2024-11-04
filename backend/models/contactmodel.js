const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema
const contactSchema = new Schema({
  First_name: String,
  Last_name: String,
  email: String,
 message:String
});

exports.Contact= mongoose.model('contact', contactSchema);