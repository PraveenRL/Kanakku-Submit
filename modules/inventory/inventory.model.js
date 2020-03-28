const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');

let inventorySchema = new Schema({
    _id: { type: String, default: uuid },
    product_name: String,
    product_id: String,
    category: String,
    select:String,
    quantity: Number
},
{
    collection: 'inventory'
})


module.exports = mongoose.model('inventorySchema', inventorySchema);