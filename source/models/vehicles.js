const db = require('../helpers/db');

exports.getVehicles = (cb) => {
    db.query('SELECT * FROM vehicle', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getVehicle = (id, cb) => {
    db.query('SELECT * FROM vehicle WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.postVehicle = (data, cb) =>{
    db.query('INSERT INTO vehicle SET ?', data, (err, res) => {
        if(err) throw err;
        cb(res);
    });
    return (db);
};

exports.patchVehicle = (data, id, cb) => {
    db.query('UPDATE vehicle SET ? WHERE id=?', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
    return(db);
};

exports.deleteVehicle = (id, cb) => {
    db.query('DELETE FROM vehicle WHERE id = ?',[id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};