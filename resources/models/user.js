const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
         type:String,
         required: true
         },
    number: {
        type: Number,
        required: true,
        unique:true
    },
    address:{
        type:String,
        required: true
        },
    zone:{
        type: Number,
        required: true
    },
    ref:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

module.exports = new mongoose.model('User',userSchema);