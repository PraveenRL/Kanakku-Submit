const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');

let productSchema = new Schema({
    _id: { type: String, default: uuid },    
    store_name: String,
    time: String,
    product_name: {
        type: String
    },
    product_id: {
        type: String
    },
    category: {
        type: String
    },
    offer: {
        type: Number
    },
    mrp: {
        type: Number
    },
    retail_price: {
        type: Number
    },
    select:String,
    quantity: Number
}, {
        collection: 'product'
    })

module.exports = mongoose.model('productSchema', productSchema)