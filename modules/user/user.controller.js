let SignSchema = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtDecode = require('jwt-decode');

var signUp = function (req, res) {
    SignSchema.countDocuments({ store_name: req.body.store_name }, (err, count) => {
        if (count > 0) {
            res.send('User Exist');
            console.log(count)
        }
        else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                var date = new Date();                          //Date
                const user = new SignSchema({
                    password: hash,
                    name: req.body.name,
                    store_name: req.body.store_name,
                    phone: req.body.phone,
                    landline: req.body.landline,
                    address: req.body.address,
                    pan: req.body.pan,
                    gst: req.body.gst,
                    time: date.toLocaleString()
                })
                user.save().then((response) => {
                    res.status(200).json({
                        message: 'User Saved',
                        result: response
                    });
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err })
                })
            })
        }
    }
    )
};

var login = function (req, res, next) {
    let getUser;
    SignSchema.findOne({
        phone: req.body.phone
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Account does not exist!"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            store_name: getUser.store_name,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1d"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 86400,
            _id: getUser._id
        });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: "Invalid"
        });
    });
}

var access = function (req, res) {
    SignSchema.findById(req.params.id, (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
        console.log(data + "\nSignIn Successfully")
    })
}

var get = function (req, res) {
    let token = req.headers.authorization;
    var decoded = jwtDecode(token)
    req.body.store_name = decoded.store_name
    SignSchema.find({ store_name: decoded.store_name }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}

var put = function (req,res) {
    SignSchema.findByIdAndUpdate(req.params.id , {$set: req.body} , (err,data) => {
        if(err) throw error;
        res.json(data);
        console.log("Updated " + data)
    })
}

module.exports = {
    signUp: signUp,
    login: login,
    access: access,
    get: get,
    put:put,
}