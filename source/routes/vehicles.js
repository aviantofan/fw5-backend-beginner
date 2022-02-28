const vehicles = require('express').Router();
const cors = require('cors');

const { getVehicles, getPopulars, getVehiclesCategory, getVehicle, postVehicle, patchVehicle, deleteVehicle } = require('../controllers/vehicles');
const { verifyUser } = require('../helpers/auth');

vehicles.get('/', cors(), getVehicles);
vehicles.post('/', verifyUser, postVehicle);
vehicles.get('/category', cors(), getVehiclesCategory);
vehicles.get('/:id', cors(), getVehicle);
vehicles.patch('/:id', verifyUser, patchVehicle);
vehicles.delete('/:id', verifyUser, deleteVehicle);
vehicles.get('/p/populars', cors(), getPopulars);

module.exports = vehicles;