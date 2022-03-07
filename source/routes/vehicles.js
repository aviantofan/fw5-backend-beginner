const vehicles = require('express').Router();

const { getVehicles, getPopulars, getVehiclesCategory, getVehicle, postVehicle, patchVehicle, deleteVehicle } = require('../controllers/vehicles');
const { verifyUser } = require('../helpers/auth');

vehicles.get('/', getVehicles);
vehicles.post('/', verifyUser, postVehicle);
vehicles.get('/category', getVehiclesCategory);
vehicles.get('/:id', getVehicle);
vehicles.patch('/:id', verifyUser, patchVehicle);
vehicles.delete('/:id', verifyUser, deleteVehicle);
vehicles.get('/p/populars', getPopulars);

module.exports = vehicles;