const users = require('express').Router();

const { getUsers, getUser, postUser, patchUser, deleteUser } = require('../controllers/users');
const { verifyUser, verifyAdmin } = require('../helpers/auth');

users.post('/', verifyAdmin, postUser);
users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.patch('/:id', patchUser);
users.delete('/:id', verifyAdmin, deleteUser);


module.exports = users;