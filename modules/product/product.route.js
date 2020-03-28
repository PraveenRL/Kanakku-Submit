const express = require('express');
const product = require('./product.controller');
const productRoute = express.Router();
const authorize = require('../user/middleware/auth');

productRoute.route('/create').post(authorize,product.create);
productRoute.route('/list').get(product.list);
productRoute.route('/listid/:id').get(product.listid);
productRoute.route('/edit/:id').put(product.edit);
productRoute.route('/delete/:id').delete(product.removeProduct);
productRoute.route('/fetchproduct').post(authorize,product.fetch);


module.exports = productRoute;