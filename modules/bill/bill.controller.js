let billSchema = require('./bill.model');
const jwtDecode = require('jwt-decode');

var postbill = function (req, res) {
    let token = req.headers.authorization;
    var decoded = jwtDecode(token);                 //Decode jwt
    console.log(decoded);
    var data = req.body;
    var date = new Date();
    var total = 0;
    if (data != null && data.length > 0) {
        data.forEach(x => total += x.retail_price)
    }
    console.log(data)
    let billdata = new billSchema({
        store_name: decoded.store_name,
        product: req.body,
        total_cost: total,
        bill_time: date.toLocaleString()
    })
    billdata.save(function (err, data) {
        if (err) throw err;
        res.status(201).json(data);
        console.log('Bill Created' + data);
    })
}

var listbill = function (req, res) {
    let token = req.headers.authorization;
    var decode = jwtDecode(token);
    req.body.store_name = decode.store_name
    billSchema.find({ store_name: decode.store_name }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data)
        }
    })
}

var billget = function (req, res) {
    billSchema.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
    })
}

var billedit = function (req, res) {
    billSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
        if (err) throw err;
        res.json(data);
        console.log("Updated " + data)
    })
}

var billdelete = function (req, res) {
    billSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) throw err;
        res.status(200).json({
            msg: data
        })
        console.log(data + "Deleted")
    })
}

module.exports = {
    postbill: postbill,
    listbill: listbill,
    billget: billget,
    billedit: billedit,
    billdelete: billdelete,
    // allbill: allbill
}