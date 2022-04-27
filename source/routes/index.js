const route = require('express').Router();
const cors = require('cors');
const response = require('../helpers/response');

route.use('/vehicles', cors(), require('./vehicles'));
route.use('/users', cors(), require('./users'));
route.use('/histories', cors(), require('./histories'));
route.use('/categories', cors(), require('./categories'));
route.use('/auth', cors(), require('./auth'));
route.use('/profile', cors(), require('./profile'));

route.get('/', (req, res) => {
  return response(res, 'Hi Hello, Backend Is Running Well', null, null);
});

module.exports = route;