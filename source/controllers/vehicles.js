const vehicleModel = require('../models/vehicles')

exports.getVehicles = (req, res) => {
  vehicleModel.getVehicles(results => {
    return res.json({
      success: true,
      message: 'List Vehicles',
      results: results
    })
  })
}

exports.getVehicle = (req, res) => {
  const {id} = req.params
  vehicleModel.getVehicle(id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Detail Vehicle',
        results: results[0]
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      })
    }
  })
}

exports.postVehicle = (req,res) =>{
  const vehicle = []
  data = {
    merk : req.body.merk,
    tipe : req.body.tipe,
    harga : req.body.harga
  }
  vehicle.push(data)
  vehicleModel.postVehicle(data, results =>{
    return res.json({
      success : true,
      messages : 'Input vehicle success!',
      results : results
    })
  })
}

exports.patchVehicle = (req,res) =>{
  const vehicle = []
  data = {
    merk : req.body.merk,
    tipe : req.body.tipe,
    harga : req.body.harga
  }
  vehicle.push(data)
  const {id} = req.params
  vehicleModel.patchVehicle(data, id, results =>{
    return res.json({
      success : true,
      messages : 'Input vehicle success!',
      results : results
    })
  })
}


exports.deleteVehicle = (req, res) => {
  const {id} = req.params
  vehicleModel.deleteVehicle(id, results => {
    return res.json({
      success: true,
      message: 'Deleted data successfully',
    })
  })
}