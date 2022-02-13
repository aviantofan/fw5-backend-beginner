const categories = require('express').Router();

const { getCategories, getCategory, postCategory, patchCategory, deleteCategory } = require('../controllers/categories');
const { verifyUser } = require('../helpers/auth');

categories.get('/', verifyUser, getCategories);
categories.post('/', verifyUser, postCategory);
categories.get('/:id', verifyUser, getCategory);
categories.patch('/:id', verifyUser, patchCategory);
categories.delete('/:id', verifyUser, deleteCategory);

module.exports = categories;