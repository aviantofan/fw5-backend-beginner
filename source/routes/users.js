const users = require('express').Router();

const {getUsers, getUser, postUser, patchUser, deleteUser} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/in', postUser);
users.patch('/:id', patchUser);
users.delete('/:id', deleteUser);


module.exports = users;