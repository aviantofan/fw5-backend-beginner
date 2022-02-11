const users = require('express').Router();

const { getUsers, getUser, postUser, patchUser, deleteUser } = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.patch('/profile/:id', patchUser);
users.delete('/:id', deleteUser);
users.post('/profile/:id', postUser);
users.get('/profile/:id', getUser);

module.exports = users;