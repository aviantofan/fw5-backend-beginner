const userModel = require('../models/users');

exports.getUsers = (req, res) => {
    userModel.getUsers(results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'List Users',
                results: results
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Users list not found'
            });
        }
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
    const data = {
        name   : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        address : req.body.address,
        birthdate : req.body.birthdate
    };
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

exports.patchUser = (req,res) =>{
    const data = {
        name   : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        address : req.body.address,
        birthdate : req.body.birthdate
    };
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