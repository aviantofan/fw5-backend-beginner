const users = require('express').Router();

const { getUsers, getUser, postUser, patchUser, deleteUser } = require('../controllers/users');
const { verifyUser, verifyAdmin } = require('../helpers/auth');

users.get('/', verifyUser, getUsers);
users.get('/:id', verifyUser, getUser);
users.patch('/:id', verifyUser, patchUser);
users.delete('/:id', verifyAdmin, deleteUser);
users.post('/:id', verifyAdmin, postUser);

module.exports = users;