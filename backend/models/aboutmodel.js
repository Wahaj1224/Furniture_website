const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    simage: String,
    sname: String,
    stitle: String,
    sdescription: String
})

exports.About= mongoose.model('about', aboutSchema);
