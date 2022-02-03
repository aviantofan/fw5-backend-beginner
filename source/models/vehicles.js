const db = require('../helpers/db');

exports.getVehicles = (cb) => {
    db.query('SELECT * FROM vehicles', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicle = (id, cb) => {
    db.query('SELECT * FROM vehicles WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getVehiclesCategory = (cb) => {
    db.query('SELECT v.name, c.name AS categoryName FROM vehicles v LEFT JOIN categories c ON v.category_id=c.id', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicleCheck = (data,cb) => {
    db.query('SELECT name FROM vehicles WHERE name = ?', [data.name], (err, res) => {
        if(err) throw err;
        cb(res);
    });
    return(db);
};

exports.postVehicle = (data, cb) =>{
    db.query('INSERT INTO vehicles SET ?', data, (err, res) => {
        if(err) throw err;
        cb(res);
    });
    return (db);
};

exports.patchVehicle = (data, id, cb) => {
    db.query('UPDATE vehicles SET ? WHERE id=?', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
    return(db);
};

exports.deleteVehicle = (id, cb) => {
    db.query('DELETE FROM vehicles WHERE id = ?',[id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};