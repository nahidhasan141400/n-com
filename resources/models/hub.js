const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
    name:{
         type:String,
         required: true
         },
    number: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
        },
    roll: {
        type: String,
        default : "stuf"
        }
});

module.exports = new mongoose.model('Hub',menuSchema);