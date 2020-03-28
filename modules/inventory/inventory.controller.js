let inventorySchema = require('./inventory.model');
const jwtDecode = require('jwt-decode');


var add = function (req, res) {
    inventorySchema.countDocuments({product_name: req.body.product_name}, (err, count) => {
        if(count > 0){
            console.log(count);
        }
        else{
        inventorySchema.create(req.body,(err, data)=>{
            if(err) throw err;
            res.status(201).json(data);
            console.log("Inventory Added" + data);
        })
    }
    })
}

var list = function (req, res) {
    let token = req.headers.authorization;
    var decoded = jwtDecode(token)
    inventorySchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}

var listid = function (req, res) {
    inventorySchema.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
}

var edit = function (req,res){
    inventorySchema.findByIdAndUpdate(req.params.id, {$set : req.body}, (err,data)=>{
        if (err) throw err;
        res.json(data);
        console.log('Updated' + data);
    })
}

var remove = function (req, res) {
    inventorySchema.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) throw err;
        res.status(200).json({
            msg: data
        })
        console.log(data + "Deleted")
    })
}

module.exports = {
    add:add,
    list:list,
    edit:edit,
    remove:remove,
    listid:listid
    
}