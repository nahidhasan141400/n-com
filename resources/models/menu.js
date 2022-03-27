const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
    name:{
         type:String,
         required: true
         },
    price: {
        type: Number,
        required: true
    },
    img:{
        type:String,
        required: true
        },
        active: {
            type: Boolean,
            default : true
         }
});

module.exports = new mongoose.model('menu',menuSchema);