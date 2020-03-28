const express = require('express');
const bill = require('./bill.controller');
const authorize = require('../user/middleware/auth');
const billingRoute = express.Router();

billingRoute.route('/postbill').post(authorize,bill.postbill);
billingRoute.route('/listbill').get(bill.listbill);
billingRoute.route('/billid/:id').get(bill.billget);
billingRoute.route('/billedit/:id').put(bill.billedit);
billingRoute.route('/billdelete/:id').delete(bill.billdelete);


module.exports = billingRoute;