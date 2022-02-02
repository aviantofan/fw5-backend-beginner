const vehicles = require('express').Router();

const {getVehicle, postVehicle, patchVehicle, deleteVehicle} = require('../controllers/vehicles');

vehicles.get('/:id', getVehicle);
vehicles.post('/', postVehicle);
vehicles.patch('/:id', patchVehicle);
vehicles.delete('/:id', deleteVehicle);


module.exports = vehicles;