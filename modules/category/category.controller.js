const categorySchema = require('./category.model');
const jwtDecode = require('jwt-decode');

var create = function(req,res){
    categorySchema.countDocuments({product_name : req.body.product_name}, (err,count) => {
        if(err) throw err;
        else if (count > 0) {
            res.send('Product Already Added');
            console.log(count)
        }
        else {
            let token = req.headers.authorization;
            var decoded = jwtDecode(token);                 //Decode jwt
            req.body.store_name = decoded.store_name        //Add element to object
            var date = new Date();                          //Date
            req.body.time = date.toLocaleString();
            categorySchema.create(req.body, (err, data) => {
                if (err) throw err;
                res.status(201).json(data);
                console.log('Product created' + data)
            })
        } 
    })
}

var list = function (req, res) {
    let token = req.headers.authorization;
    var decoded = jwtDecode(token)
    categorySchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}

var listid = function (req, res) {
    categorySchema.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
}

module.exports = {
    create:create,
    list:list,
    listid:listid,
}