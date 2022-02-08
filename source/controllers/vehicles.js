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
    let {name, location, page, limit} = req.query;
    name = name || '';
    location = location || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const fin = {name, location, page, limit, offset};
    vehicleModel.getVehicles(fin, results => {
        vehicleModel.countVehicles(fin, (count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (results.length > 0) {
                return res.json({
                    success: true,
                    message: 'List Vehicles',
                    results: results,
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/vehicles?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Vehicles list not found',
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/vehicles?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            }
        });
    });
};

exports.getVehiclesCategory = (req, res) => {
    let {name, location, categoryName, page, limit} = req.query;
    name = name || '';
    location = location || '';
    categoryName = categoryName || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const fin = {name, location, categoryName, page, limit, offset};
    vehicleModel.getVehiclesCategory(fin, results => {
        vehicleModel.countVehicles(fin, (count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (results.length > 0) {
                return res.json({
                    success: true,
                    message: 'List Vehicles Category',
                    results: results,
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/vehicles?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Vehicles Category list not found',
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/vehicles?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/vehicles?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            }
        });
    });
};

exports.getVehicle = (req, res) => {
    const id = parseInt(req.params.id)|| null;
    if (!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id>0){
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
                    message: `Vehicle with ID: ${id} found`
                });
            }
        });
    } else {
        return res.status(400).send({
            success: false,
            message: 'Id should be a number greater than 0'
        });
    } 
};

exports.postVehicle = (req,res) =>{
    const data = {
        name   : req.body.name,
        color : req.body.color,
        loc : req.body.loc,
        isAvailable : req.body.isAvailable,
        isPrepay : req.body.isPrepay,
        capacity : parseInt(req.body.capacity) || null,
        category_id : parseInt(req.body.category_id) || null,
        reservationBefore : req.body.reservationBefore,
        price : parseInt(req.body.price) || null,
        qty : req.body.qty
    };
    if (!data.capacity){
        return res.status(400).send({
            success : false,
            message : 'Invalid input, Capacity must be a Number!'
        });
    }
    if (!data.category_id){
        return res.status(400).send({
            success : false,
            message : 'Invalid input, Category_id must be a Number!'
        });
    }
    if (!data.price){
        return res.status(400).send({
            success : false,
            message : 'Invalid input, Price must be a Number!'
        });
    }
    vehicleModel.getVehicleCheck(data, results =>{
        if (results.length < 1){
            vehicleModel.postVehicle(data, (results =>{
                if(results.affectedRows == 1){ 
                    vehicleModel.getVehicle(results.insertId, (temp) =>{
                        return res.send({
                            success : true,
                            messages : 'Input data vehicle success!',
                            results : temp[0]
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
    const data = {
        name   : req.body.name,
        color : req.body.color,
        loc : req.body.loc,
        isAvailable : req.body.isAvailable,
        isPrepay : req.body.isPrepay,
        capacity : parseInt(req.body.capacity) || null,
        category_id : parseInt(req.body.category_id) || null,
        reservationBefore : req.body.reservationBefore,
        price : parseInt(req.body.price) || null,
        qty : req.body.qty
    };
    if (!data.capacity){
        return res.status(400).send({
            success : false,
            message : 'Invalid input, Capacity must be a Number!'
        });
    }
    if (!data.category_id){
        return res.status(400).send({
            success : false,
            message : 'Invalid input, Category_id must be a Number!'
        });
    }
    if (!data.price){
        return res.status(400).send({
            success : false,
            message : 'Invalid input, Price must be a Number!'
        });
    }
    const id = parseInt(req.params.id) || null;
    if (!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id>0){
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
                    message: `Vehicle with ID : ${id} not found`
                });
            }
        }));
    }else{
        return res.status(400).send({
            success: false,
            message: 'Id should be a number greater than 0'
        });
    }
};

exports.deleteVehicle = (req, res) => {
    const id = parseInt(req.params.id) || null;
    if (!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    vehicleModel.getVehicle(id, (results => {
        if (id!==null && id!==undefined){
            if (id > 0) {
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
                        message: `Vehicle with ID : ${id} not found`
                    });
                }
            }else{
                return res.status(400).send({
                    success: false,
                    message: 'Id should be a number greater than 0'
                });
            }
        }else{
            return res.status(400).send({
                success: false,
                message: 'Undefined Id'
            });
        }

    }));
};