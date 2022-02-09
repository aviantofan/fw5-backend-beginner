const histories = require('express').Router();

const {getHistories, popularBasedOnMonth, getHistory, postHistory, patchHistory, deleteHistory} = require('../controllers/histories');


histories.get('/', getHistories);
histories.post('/', postHistory);
histories.get('/:id', getHistory);
histories.patch('/:id', patchHistory);
histories.delete('/:id', deleteHistory);
histories.get('/vehicles/createdAt', popularBasedOnMonth);

module.exports = histories;