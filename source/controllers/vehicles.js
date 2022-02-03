const vehicleModel = require('../models/vehicles');

exports.getPopulars = (req, res) => {
    vehicleModel.getPopulars(results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'List Populars',
                results: results
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Populars list not found'
            });
        }
    });
};

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

exports.getVehiclesCategory = (req, res) => {
    vehicleModel.getVehiclesCategory(results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'List Vehicles Category',
                results: results
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Vehicles Category list not found'
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
    const capacity = parseInt(req.body.price) || null;
    const price = parseInt(req.body.price) || null;
    const qty = parseInt(req.body.qty);
    if (!capacity){
        return res.status(400).send({
            success : false,
            message : 'Capacity must be a Number!'
        });
    }
    if (!price){
        return res.status(400).send({
            success : false,
            message : 'Price must be a NUMBER!'
        });
    }
    if (!qty){
        return res.status(400).send({
            success : false,
            message : 'Quantity must be a NUMBER!'
        });
    }
    const data = {
        name   : req.body.name,
        color : req.body.color,
        loc : req.body.loc,
        isAvailable : req.body.isAvailable,
        isPrepay : req.body.isPrepay,
        capacity : req.body.capacity,
        category_id : req.body.category_id,
        reservationBefore : req.body.reservationBefore,
        price : req.body.price,
        qty : req.body.qty
    };
    vehicleModel.getVehicleCheck(data, results =>{
        if (results.length < 1){
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
        }else{
            return res.status(400).send({
                success : false,
                message : 'Data has already inserted!'
            });
        }
    });
};

exports.patchVehicle = (req,res) =>{
    const capacity = parseInt(req.body.price) || null;
    const price = parseInt(req.body.price) || null;
    const qty = parseInt(req.body.qty);
    if (!capacity){
        return res.status(400).send({
            success : false,
            message : 'Capacity must be a Number!'
        });
    }
    if (!price){
        return res.status(400).send({
            success : false,
            message : 'Price must be a NUMBER!'
        });
    }
    if (!qty){
        return res.status(400).send({
            success : false,
            message : 'Quantity must be a NUMBER!'
        });
    }
    const data = {
        name   : req.body.name,
        color : req.body.color,
        loc : req.body.loc,
        isAvailable : req.body.isAvailable,
        isPrepay : req.body.isPrepay,
        capacity : req.body.capacity,
        category_id : req.body.category_id,
        reservationBefore : req.body.reservationBefore,
        price : req.body.price,
        qty : req.body.qty
    };
    const {id} = req.params;
    vehicleModel.getVehicle(id, (results =>{
        if (results.length > 0){
            vehicleModel.patchVehicle(data, id, (results =>{
                if(results.affectedRows == 1){
                    vehicleModel.getVehicle(id, (results => {
                        return res.send({
                            success : true,
                            messages : 'Updated data vehicle success!',
                            results : results[0]
                        });
                    }));
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