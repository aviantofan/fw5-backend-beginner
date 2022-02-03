const vehicles = require('express').Router();

const {getVehicles, getVehiclesCategory, getVehicle, postVehicle, patchVehicle, deleteVehicle} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/category', getVehiclesCategory);
vehicles.get('/:id', getVehicle);
vehicles.post('/', postVehicle);
vehicles.patch('/:id', patchVehicle);
vehicles.delete('/:id', deleteVehicle);


module.exports = vehicles;