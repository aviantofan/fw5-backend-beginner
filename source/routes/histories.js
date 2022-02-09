const histories = require('express').Router();

const {getHistories, popularBasedOnMonth, getHistory, postHistory, patchHistory, deleteHistory} = require('../controllers/histories');

histories.get('/vehicles/createdAt', popularBasedOnMonth);
histories.get('/', getHistories);
histories.get('/:id', getHistory);
histories.post('/', postHistory);
histories.patch('/:id', patchHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;