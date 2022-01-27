const vehicleModel = require('../models/vehicles');

exports.getVehicles = (req, res) => {
    vehicleModel.getVehicles(results => {
        return res.json({
            success: true,
            message: 'List Vehicles',
            results: results
        });
    });
};

exports.getVehicle = (req, res) => {
    const {id} = req.params;
    vehicleModel.getVehicle(id, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'Detail Vehicle',
                results: results[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }
    });
};

exports.postVehicle = (req,res) =>{
    const vehicle = [];
    const data = {
        nameVehicle   : req.body.nameVehicle,
        colorVehicle : req.body.colorVehicle,
        locVehicle : req.body.locVehicle,
        isAvailable : req.body.isAvailable,
        isRepay : req.body.isRepay,
        capacityVehicle : req.body.capacityVehicle,
        typeVehicle : req.body.typeVehicle,
        timeReserved : req.body.timeReserved,
        priceVehicle : req.body.priceVehicle,
        quantityVehicle : req.body.quantityVehicle
    };
    vehicle.push(data);
    vehicleModel.postVehicle(data, (results =>{
        if(results.affectedRows == 1){
            return res.send({
                success : true,
                messages : 'Input data vehicle success!',
            });
        }else{
            return res.status(500).send({
                success : false,
                message : 'Input data vehicle failed!'
            });
        }
    }));
};

exports.patchVehicle = (req,res) =>{
    const vehicle = [];
    const data = {
        nameVehicle   : req.body.nameVehicle,
        colorVehicle : req.body.colorVehicle,
        locVehicle : req.body.locVehicle,
        isAvailable : req.body.isAvailable,
        isRepay : req.body.isRepay,
        capacityVehicle : req.body.capacityVehicle,
        typeVehicle : req.body.typeVehicle,
        timeReserved : req.body.timeReserved,
        priceVehicle : req.body.priceVehicle,
        quantityVehicle : req.body.quantityVehicle
    };
    vehicle.push(data);
    const {id} = req.params;
    vehicleModel.getVehicle(id, (results =>{
        if (results.length > 0){
            vehicleModel.patchVehicle(data, id, (results =>{
                if(results.affectedRows == 1){
                    return res.send({
                        success : true,
                        messages : 'Data vehicle updated success!',
                    });
                }else{
                    return res.status(500).send({
                        success : false,
                        message : 'Data vehicle updated failed!'
                    });
                }
            }));
        }else{
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }
    }));
};


exports.deleteVehicle = (req, res) => {
    const {id} = req.params;
    vehicleModel.getVehicle(id, (results => {
        if (results.length > 0) {
            vehicleModel.deleteVehicle(id,(results => {
                if(results.affectedRows == 1){
                    return res.send({
                        success : true,
                        message : 'Data vehicle deleted success!'
                    });
                }else{
                    return res.status(500).send({
                        success : false,
                        message : 'Data vehicle delete failed!'
                    });
                }
            }));
        } else {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }
    }));
};