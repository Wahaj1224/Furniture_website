const mongoose = require('mongoose');

const subscribeSchema = mongoose.Schema({
    name: String,
    email: String
})

exports.Subscribe= mongoose.model('subscribe', subscribeSchema);
