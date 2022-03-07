const users = require('express').Router();

const { getUsers, getUser, postUser, patchUser, deleteUser } = require('../controllers/users');
const { verifyUser } = require('../helpers/auth');

users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.patch('/:id', verifyUser, patchUser);
users.delete('/:id', verifyUser, deleteUser);
users.post('/:id', verifyUser, postUser);

module.exports = users;