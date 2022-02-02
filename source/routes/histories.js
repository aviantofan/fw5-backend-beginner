const histories = require('express').Router();

const {getHistories, getHistory, postHistory, patchHistory, deleteHistory} = require('../controllers/histories');

histories.get('/', getHistories);
histories.get('/:id', getHistory);
histories.post('/in', postHistory);
histories.patch('/:id', patchHistory);
histories.delete('/:id', deleteHistory);

module.exports = histories;