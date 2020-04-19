const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true  
    }, 
    quantity: {
        type: Number,
        required: true  
    },  
    img: {
        type:String,
        required:true
    },  
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});
 
const shoppingModel = mongoose.model('ShoppingCart', shoppingSchema);   //ShoppingCart--> is named "shoppingCarts" in database
module.exports = shoppingModel;