const historyModel = require('../models/histories');

exports.getHistories = (req, res) => {
    historyModel.getHistories(results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'List Histories',
                results: results
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'History list not found'
            });
        }
    });
};

exports.getHistory = (req, res) => {
    const {id} = req.params;
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
                message: 'History not found'
            });
        }
    });
};

exports.postHistory = (req,res) =>{
    const data = {
        user_id : req.body.user_id,
        vehicle_id : req.body.vehicle_id,
        rentStartDate : req.body.rentStartDate,
        rentEndDate : req.body.rentEndDate,
        prepayment : req.body.prepayment,
        isReturned : req.body.isReturned
    };
    historyModel.postHistory(data, (results =>{
        if(results.affectedRows == 1){ 
            historyModel.getHistories(results => {
                return res.send({
                    success : true,
                    messages : 'Input data history success!',
                    results : results
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
        user_id : req.body.user_id,
        vehicle_id : req.body.vehicle_id,
        rentStartDate : req.body.rentStartDate,
        rentEndDate : req.body.rentEndDate,
        prepayment : req.body.prepayment,
        isReturned : req.body.isReturned
    };
    const {id} = req.params;
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
                message: 'History not found'
            });
        }
    }));
};


exports.deleteHistory = (req, res) => {
    const {id} = req.params;
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
                message: 'History not found'
            });
        }
    }));
};