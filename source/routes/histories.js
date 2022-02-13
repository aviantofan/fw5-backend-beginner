const histories = require('express').Router();

const { getHistories, popularBasedOnMonth, getHistory, postHistory, patchHistory, deleteHistory } = require('../controllers/histories');
const { verifyUser } = require('../helpers/auth');

histories.get('/', verifyUser, getHistories);
histories.post('/', verifyUser, postHistory);
histories.get('/:id', verifyUser, getHistory);
histories.patch('/:id', verifyUser, patchHistory);
histories.delete('/:id', verifyUser, deleteHistory);
histories.get('/vehicles/createdAt', verifyUser, popularBasedOnMonth);

module.exports = histories;