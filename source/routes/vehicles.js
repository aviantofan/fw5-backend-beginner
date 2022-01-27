const vehicles = require('express').Router()

const {getVehicles, getVehicle, postVehicle, patchVehicle, deleteVehicle} = require('../controllers/vehicles')

vehicles.get('/', getVehicles)
vehicles.get('/:id', getVehicle)
vehicles.post('/in', postVehicle)
// vehicles.patch('/:id', patchVehicle)
vehicles.delete('/:id', deleteVehicle)


module.exports = vehicles