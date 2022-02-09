const vehicles = require('express').Router();

const {getVehicles, getPopulars, getVehiclesCategory, getVehicle, postVehicle, patchVehicle, deleteVehicle} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.post('/', postVehicle);
vehicles.get('/category', getVehiclesCategory);
vehicles.get('/:id', getVehicle);
vehicles.patch('/:id', patchVehicle);
vehicles.delete('/:id', deleteVehicle);
vehicles.get('/populars', getPopulars);

module.exports = vehicles;