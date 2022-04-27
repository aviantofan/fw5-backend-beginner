const users = require('express').Router();

const { login, /*verify,*/ register, forgotPassword } = require('../controllers/auth');

users.post('/login', login);
// users.post('/verify', verify);
users.post('/register', register);
users.post('/forgotPassword', forgotPassword);

module.exports = users;