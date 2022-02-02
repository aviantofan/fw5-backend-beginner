const categoryModel = require('../models/categories');

exports.getCategories = (req, res) => {
    categoryModel.getCategories(results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'List Categories',
                results: results
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Categories list not found'
            });
        }
    });
};

exports.getCategory = (req, res) => {
    const {id} = req.params;
    categoryModel.getCategory(id, results => {
        if (results.length > 0) {
            return res.json({
                success: true,
                message: 'Detail Category',
                results: results[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'category not found'
            });
        }
    });
};

exports.postCategory = (req,res) =>{
    const  {name} = req.body.name;

    categoryModel.getCategoryCheck(name, results =>{
        if (results.length < 1){
            categoryModel.postCategory(name, (results =>{
                if(results.affectedRows == 1){ 
                    categoryModel.getCategory(results => {
                        return res.send({
                            success : true,
                            messages : 'Input data category success!',
                            results : results
                        });
                    });
                }else{
                    return res.status(500).send({
                        success : false,
                        message : 'Input data category failed!'
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

exports.patchCategory = (req,res) =>{
    const history = [];
    const data = {
        name : req.body.name
    };
    history.push(data);
    const {id} = req.params;
    categoryModel.getCategory(id, (results =>{
        if (results.length > 0){
            categoryModel.patchCategory(data, id, (results =>{
                if(results.affectedRows == 1){
                    return res.send({
                        success : true,
                        messages : 'Data category updated success!',
                    });
                }else{
                    return res.status(500).send({
                        success : false,
                        message : 'Data category updated failed!'
                    });
                }
            }));
        }else{
            return res.status(404).json({
                success: false,
                message: 'category not found'
            });
        }
    }));
};


exports.deleteCategory = (req, res) => {
    const {id} = req.params;
    categoryModel.getCategory(id, (results => {
        if (results.length > 0) {
            categoryModel.deleteCategory(id,(results => {
                if(results.affectedRows == 1){
                    return res.send({
                        success : true,
                        message : 'Data category deleted success!'
                    });
                }else{
                    return res.status(500).send({
                        success : false,
                        message : 'Data category delete failed!'
                    });
                }
            }));
        } else {
            return res.status(404).json({
                success: false,
                message: 'category not found'
            });
        }
    }));
};