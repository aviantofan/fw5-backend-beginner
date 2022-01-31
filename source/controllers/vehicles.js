const vehicleModel = require('../models/vehicles');

exports.getVehicles = (req, res) => {
    vehicleModel.getVehicles(results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'List Vehicles',
                results: results
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Vehicles list not found'
            });
        }
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
    const data = {
        name   : req.body.name,
        color : req.body.color,
        loc : req.body.loc,
        isAvailable : req.body.isAvailable,
        isPrepay : req.body.isPrepay,
        capacity : req.body.capacity,
        type : req.body.type,
        reservationBefore : req.body.reservationBefore,
        price : req.body.price,
        qty : req.body.qty
    };
    vehicleModel.postVehicle(data, (results =>{
        if(results.affectedRows == 1){ 
            vehicleModel.getVehicles(results => {
                return res.send({
                    success : true,
                    messages : 'Input data vehicle success!',
                    results : results
                });
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
        name   : req.body.name,
        color : req.body.color,
        loc : req.body.loc,
        isAvailable : req.body.isAvailable,
        isRepay : req.body.isRepay,
        capacity : req.body.capacity,
        type : req.body.typeVehicle,
        timeReserved : req.body.timeReserved,
        price : req.body.price,
        quantity : req.body.quantity
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
                        results : results
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