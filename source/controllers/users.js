const userModel = require('../models/vehicles');

exports.getUsers = (req, res) => {
    userModel.getUsers(results => {
        return res.json({
            success: true,
            message: 'List Users',
            results: results
        });
    });
};

exports.getUser = (req, res) => {
    const {id} = req.params;
    userModel.getUser(id, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'Detail user',
                results: results[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    });
};

exports.postUser = (req,res) =>{
    const user = [];
    const data = {
        nameUser   : req.body.nameUser,
        emailUser : req.body.emailUser,
        genderUser : req.body.genderUser,
        addressUser : req.body.addressUser,
        birthDate : req.body.birthDate
    };
    user.push(data);
    userModel.postUser(data, (results =>{
        if(results.affectedRows == 1){
            return res.send({
                success : true,
                messages : 'Input data user success!',
            });
        }else{
            return res.status(500).send({
                success : false,
                message : 'Input data user failed!'
            });
        }
    }));
};

exports.patchVehicle = (req,res) =>{
    const user = [];
    const data = {
        nameUser   : req.body.nameUser,
        emailUser : req.body.emailUser,
        genderUser : req.body.genderUser,
        addressUser : req.body.addressUser,
        birthDate : req.body.birthDate
    };
    user.push(data);
    const {id} = req.params;
    userModel.getUser(id, (results =>{
        if (results.length > 0){
            userModel.patchUser(data, id, (results =>{
                if(results.affectedRows == 1){
                    return res.send({
                        success : true,
                        messages : 'Data user updated success!',
                    });
                }else{
                    return res.status(500).send({
                        success : false,
                        message : 'Data user updated failed!'
                    });
                }
            }));
        }else{
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    }));
};


exports.deleteUser = (req, res) => {
    const {id} = req.params;
    userModel.getUser(id, (results => {
        if (results.length > 0) {
            userModel.deleteUser(id,(results => {
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
                message: 'User not found'
            });
        }
    }));
};