const db = require('../helpers/db');

exports.getCategories = (cb) => {
    db.query('SELECT * FROM categories', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getCategory = (id, cb) => {
    db.query('SELECT * FROM categories WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.postCategory = (data, cb) =>{
    db.query('INSERT INTO categories SET ?', data, (err, res) => {
        if(err) throw err;
        cb(res);
    });
    return (db);
};

exports.patchCategory = (data, id, cb) => {
    db.query('UPDATE categories SET ? WHERE id=?', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
    return(db);
};

exports.deleteCategory = (id, cb) => {
    db.query('DELETE FROM categories WHERE id = ?',[id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};