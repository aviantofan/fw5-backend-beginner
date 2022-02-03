const histories = require('express').Router();

const {getHistories, getPopulars, getHistory, postHistory, patchHistory, deleteHistory} = require('../controllers/histories');

histories.get('/', getHistories);
histories.get('/populars', getPopulars);
histories.get('/:id', getHistory);
histories.post('/', postHistory);
histories.patch('/:id', patchHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;