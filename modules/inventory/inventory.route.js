const express = require('express');
const inventory = require('./inventory.controller');
const inventoryRoute = express.Router();
const authorize = require('../user/middleware/auth');

inventoryRoute.route('/create').post(authorize, inventory.add);
inventoryRoute.route('/list').get(authorize,inventory.list);
inventoryRoute.route('/listid/:id').get(authorize,inventory.listid);
inventoryRoute.route('/edit/:id').put(authorize,inventory.edit);
inventoryRoute.route('/delete/:id').delete(authorize,inventory.remove);

module.exports=inventoryRoute;