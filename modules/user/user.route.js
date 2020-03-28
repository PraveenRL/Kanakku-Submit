const express = require('express');
const authcontrol = require('./user.controller');
const authorize = require('./middleware/auth')
var authRoute = express.Router();

// authRoute.route('/login').get(authcontrol.login);
authRoute.route('/signup').post(authcontrol.signUp);
authRoute.route('/login').post(authcontrol.login);
authRoute.route('/access/:id').get(authorize, authcontrol.access);
authRoute.route('/get').get(authorize, authcontrol.get);
authRoute.route('/profile/:id').put(authorize, authcontrol.put);

module.exports = authRoute;