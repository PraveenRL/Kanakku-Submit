const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');

let billSchema = new Schema({
    _id: { type: String, default: uuid },
    biller_name: String,
    bill_time: String,
    product: [{
        _id: { type: String, default: uuid },
        product_name: String,
        product_id: String,
        quantity: Number,
        mrp: Number,
        retail_price: Number,
        offer: Number
    }],
    total_cost: Number,
    gst: Number,
    net_cost: Number,
    store_name: String,
},
// {index: true},
 {
        collection: 'bill'
    })

// billSchema.index({ name: 1, type: -1 }); 

module.exports = mongoose.model('billSchema', billSchema);
