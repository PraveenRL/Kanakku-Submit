const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    dbConfig = require('./db/database');

//Connecting MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database Connected');
},
    error => {
        console.error('DataBase could not be connected: ' + error)
    }
)

//Setting up Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

//Connecting Port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Port connected to : ' + port);
})

//Api route
const authRouting = require('./modules/user/user.route')
app.use('/user', authRouting);
const billingRoute = require('./modules/bill/bill.route')
app.use('/bill', billingRoute);
const productRoute = require('./modules/product/product.route')
app.use('/product', productRoute);
const categoryRoute = require('./modules/category/category.route')
app.use('/category', categoryRoute);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


app.use(express.static(path.join(__dirname, 'dist')));