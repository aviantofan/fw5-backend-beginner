const route = require('express').Router();
const cors = require('cors');

route.use('/vehicles', cors(), require('./vehicles'));
route.use('/users', cors(), require('./users'));
route.use('/histories', cors(), require('./histories'));
route.use('/categories', cors(), require('./categories'));
route.use('/auth', cors(), require('./auth'));
route.use('/profile', require('./profile'));

module.exports = route;