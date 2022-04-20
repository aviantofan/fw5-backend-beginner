const histories = require('express').Router();

const { getHistories, popularBasedOnMonth, getHistory, postHistory, patchHistory, deleteHistory } = require('../controllers/histories');
const { verifyUser, verifyAdmin } = require('../helpers/auth');

histories.get('/', verifyUser, getHistories);
histories.post('/', verifyUser, postHistory);
histories.get('/:id', verifyUser, getHistory);
histories.patch('/:id', verifyAdmin, patchHistory);
histories.delete('/:id', verifyUser, deleteHistory);
histories.get('/vehicles/createdAt', popularBasedOnMonth);

module.exports = histories;