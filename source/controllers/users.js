const userModel = require('../models/users');

exports.getUsers = (req, res) => {
    let {name, address, page, limit} = req.query;
    name = name || '';
    address = address || '';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page-1)*limit;
    const fin = {name, address, page, limit, offset};
    userModel.getUsers(fin, results => {
        userModel.countUsers(fin, (count) => {
            const { total } = count[0];
            const last = Math.ceil(total/limit);
            if (results.length > 0) {
                return res.json({
                    success: true,
                    message: 'List Users',
                    results: results,
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/users?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/users?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Users list not found',
                    pageInfo: {
                        prev: page > 1 ? `http://localhost:3000/users?page=${page-1}`: null,
                        next: page < last ? `http://localhost:3000/users?page=${page+1}`: null,
                        totalData:total,
                        currentPage: page,
                        lastPage: last
                    }
                });
            }
        });
    });
};

exports.getUser = (req, res) => {
    const id = parseInt(req.params.id);
    if (!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id > 0){
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
                    message: `User with ID: ${id} not found`
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

exports.postUser = (req,res) =>{
    const data = {
        name   : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        address : req.body.address,
        birthdate : req.body.birthdate
    };
    userModel.getUserCheck(data, results =>{
        if (results.length < 1){
            userModel.postUser(data, (results =>{
                if(results.affectedRows == 1){ 
                    userModel.getUser(results.insertId, (temp) => {
                        return res.send({
                            success : true,
                            messages : 'Input data user success!',
                            results : temp[0]
                        });
                    });
                }else{
                    return res.status(500).send({
                        success : false,
                        message : 'Input data user failed!'
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

exports.patchUser = (req,res) =>{
    const data = {
        name   : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        address : req.body.address,
        birthdate : req.body.birthdate
    };
    const id = parseInt(req.params.id);
    if (!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id>0){
        userModel.getUser(id, (results =>{
            if (results.length > 0){
                userModel.patchUser(data, id, (results =>{
                    if(results.affectedRows == 1){
                        userModel.getUser(id, (results => {
                            return res.send({
                                success : true,
                                messages : 'Updated data user success!',
                                results : results[0]
                            });
                        }));
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
                    message: `User with ID: ${id} not found`
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

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    if(!id){
        return res.status(400).send({
            success: false,
            message: 'Invalid input, Id must be number!'
        });
    }
    if (id>0){    
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
                    message: `User with ID: ${id} not found`
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