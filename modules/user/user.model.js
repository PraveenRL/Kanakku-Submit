const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');

let signSchema = new Schema({
    _id: { type: String, default: uuid },
    name: String,
    phone: Number,
    email: String,
    password: String,
    reporting_billers: [String],
    store_name: String,
    store_id: String,
    address: String,
    landline: String,
    gst: String,
    pan: String,
    time: String,
    aadhar: String,
}, {
        collection: "user"
    })

module.exports = mongoose.model('SignSchema', signSchema)
