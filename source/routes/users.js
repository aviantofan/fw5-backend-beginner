const users = require('express').Router();

const {getUsers, getUser, postUser, patchUser, deleteUser} = require('../controllers/users');

users.get('/', getUsers);
users.post('/', postUser);
users.get('/:id', getUser);
users.patch('/:id', patchUser);
users.delete('/:id', deleteUser);
users.get('/profile/:id', getUser);

module.exports = users;