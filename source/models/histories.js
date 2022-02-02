const db = require('../helpers/db');

exports.getHistories = (cb) => {
    db.query('SELECT * FROM histories', (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getHistory = (id, cb) => {
    db.query('SELECT * FROM histories WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.postHistory = (data, cb) =>{
    db.query('INSERT INTO histories SET ?', data, (err, res) => {
        if(err) throw err;
        cb(res);
    });
    return (db);
};

exports.patchHistory = (data, id, cb) => {
    db.query('UPDATE histories SET ? WHERE id=?', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
    return(db);
};

exports.deleteHistory = (id, cb) => {
    db.query('DELETE FROM histories WHERE id = ?',[id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};