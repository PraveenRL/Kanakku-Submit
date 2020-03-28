const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');

let categorySchema = new Schema({
    _id: { type: String, default: uuid },
    category:String,
    product_name:String,
    store_name: String,
    time: String,
},
{
    colletion:'category'
})

module.exports = mongoose.model('categorySchema', categorySchema)