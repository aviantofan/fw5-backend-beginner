const historyModel = require('../models/histories');

exports.getHistories = (req, res) => {
    let {userName, vehicleName, page, limit} = req.query;
    userName = userName || '';
    vehicleName = vehicleName || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const fin = {userName, vehicleName, page, limit, offset};
    historyModel.getHistories(fin, results => {
        historyModel.countUsers(fin, (count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (results.length > 0) {
                return res.json({
                    success: true,
                    message: 'List Histories',
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
                    message: 'History list not found',
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

exports.getHistory = (req, res) => {
    const id = parseInt(req.params.id);
    if (!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id>0){
        historyModel.getHistory(id, results => {
            if (results.length > 0) {
                return res.json({
                    success: true,
                    message: 'Detail History',
                    results: results[0]
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: `History with ID: ${id} not found`
                });
            }
        });
    }else{
        return res.status(400).send({
            success: false,
            message: 'Id should be a number greater than 0'
        });
    }
};

exports.postHistory = (req,res) =>{
    const data = {
        user_id : parseInt(req.body.user_id),
        vehicle_id : parseInt(req.body.vehicle_id),
        rentStartDate : req.body.rentStartDate,
        rentEndDate : req.body.rentEndDate,
        prepayment : req.body.prepayment,
        isReturned : req.body.isReturned
    };
    historyModel.postHistory(data, (results =>{
        if(results.affectedRows == 1){ 
            historyModel.getHistories(results.insertId, (temp) => {
                return res.send({
                    success : true,
                    messages : 'Input data history success!',
                    results : temp[0]
                });
            });
        }else{
            return res.status(500).send({
                success : false,
                message : 'Input data history failed!'
            });
        }
    }));
};

exports.patchHistory = (req,res) =>{
    const data = {
        user_id : parseInt(req.body.user_id) || null,
        vehicle_id : parseInt(req.body.vehicle_id) || null,
        rentStartDate : req.body.rentStartDate,
        rentEndDate : req.body.rentEndDate,
        prepayment : req.body.prepayment,
        isReturned : req.body.isReturned
    };
    const id = parseInt(req.params.id);
    if(!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id>0){
        historyModel.getHistory(id, (results =>{
            if (results.length > 0){
                historyModel.patchHistory(data, id, (results =>{
                    if(results.affectedRows == 1){
                        historyModel.getHistory(id, (results => {
                            return res.send({
                                success : true,
                                messages : 'Updated data history success!',
                                results : results[0]
                            });
                        }));
                    }else{
                        return res.status(500).send({
                            success : false,
                            message : 'Data history updated failed!'
                        });
                    }
                }));
            }else{
                return res.status(404).json({
                    success: false,
                    message: `History with ID: ${id} not found`
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


exports.deleteHistory = (req, res) => {
    const id = parseInt(req.params.id);
    if(!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id>0){
        historyModel.getHistory(id, (results => {
            if (results.length > 0) {
                historyModel.deleteHistory(id,(results => {
                    if(results.affectedRows == 1){
                        return res.send({
                            success : true,
                            message : 'Data user deleted success!'
                        });
                    }else{
                        return res.status(500).send({
                            success : false,
                            message : 'Data user delete failed!'
                        });
                    }
                }));
            } else {
                return res.status(404).json({
                    success: false,
                    message: `History with ID: ${id} not found`
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