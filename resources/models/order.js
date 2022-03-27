const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    customerId :{
        type:mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required:true
    },
    items:{
        type:Object,
        required:true 
    },
    phone: {type:String,required:true},
    address: {type:String,required:true},
    zone: {type:String,required:true},
    status:{type: String,default:'order placed'}
},{ timestamps:true});

module.exports = new mongoose.model('Order',orderSchema);