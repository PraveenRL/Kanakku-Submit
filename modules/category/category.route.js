const express = require('express');
const categorycontroller = require('./category.controller');
const authorize = require('../user/middleware/auth');
const categoryRoute = express.Router();

categoryRoute.route('/create').post(authorize,categorycontroller.create);
categoryRoute.route('/list').get(categorycontroller.list);
categoryRoute.route('/list/:id').get(authorize,categorycontroller.listid);
// categoryRoute.route('/edit/:id').put(authorize,categorycontroller.edit);
// categoryRoute.route('/delete/:id').delete(authorize,categorycontroller.remove);

module.exports = categoryRoute;