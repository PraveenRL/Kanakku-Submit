let productSchema = require('./product.model');
const jwtDecode = require('jwt-decode');

var create = function (req, res) {
    productSchema.countDocuments({ product_name: req.body.product_name }, (err, count) => {
        if (err) throw err;
        else if (count > 0) {
            console.log(count)
            const filter = { product_name: req.body.product_name };
            const update = { mrp: req.body.mrp, retail_price: req.body.retail_price }
            productSchema.findOneAndUpdate(filter, update, {new: true}, (err, data) => {
                if (err) throw err;
                res.send(data);
            })
        }
        else {
            let token = req.headers.authorization;
            var decoded = jwtDecode(token);                 //Decode jwt
            req.body.store_name = decoded.store_name        //Add element to object
            var date = new Date();                          //Date
            req.body.time = date.toLocaleString();
            productSchema.create(req.body, (err, data) => {
                if (err) throw err;
                res.status(201).json(data);
                console.log('Order created' + data)
            })
        }
    })
}

var list = function (req, res) {
    let token = req.headers.authorization;
    var decoded = jwtDecode(token)
    productSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}

var listid = function (req, res) {
    productSchema.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
}


var edit = function (req, res) {
    productSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
        if (err) throw err;
        res.json(data);
        console.log("Updated " + data)
    })
}

var removeProduct = function (req, res) {
    productSchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) throw err;
        res.status(200).json({
            msg: data
        })
        console.log(data + "Deleted")
    })
}

var fetch = function (req, res) {
    let token = req.headers.authorization;
    var decode = jwtDecode(token);
    let pname = req.body.product_name;
    productSchema.find({ store_name: decode.store_name, product_name: pname }, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
}

module.exports = {
    create: create,
    list: list,
    listid: listid,
    edit: edit,
    removeProduct: removeProduct,
    fetch: fetch,
}