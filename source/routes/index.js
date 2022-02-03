const route = require('express').Router();

route.use('/vehicles', require('./vehicles'));
route.use('/profile', require('./users'));
route.use('/histories', require('./histories'));
route.use('/categories', require('./categories'));

module.exports = route;