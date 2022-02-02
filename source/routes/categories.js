const categories = require('express').Router();

const {getCategories, getCategory, postCategory, patchCategory, deleteCategory} = require('../controllers/categories');

categories.get('/', getCategories);
categories.get('/:id', getCategory);
categories.post('/', postCategory);
categories.patch('/:id', patchCategory);
categories.delete('/:id', deleteCategory);

module.exports = categories;