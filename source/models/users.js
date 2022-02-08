const db = require('../helpers/db');

exports.countUsers = (fin, cb) => {
    db.query(`SELECT COUNT(*) as total FROM users WHERE name LIKE '%${fin.name}%' AND address LIKE '%${fin.address}%' LIMIT ${fin.limit}` , (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getUsers = (fin, cb) => {
    db.query(`SELECT * FROM users WHERE name LIKE '%${fin.name}%' AND address LIKE '%${fin.address}%' LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getUser = (id, cb) => {
    db.query('SELECT * FROM users WHERE id=?', [id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
};

exports.getUserCheck = (data,cb) => {
    db.query('SELECT name FROM users WHERE name = ?', [data.name], (err, res) => {
        if(err) throw err;
        cb(res);
    });
    return(db);
};

exports.postUser = (data, cb) =>{
    db.query('INSERT INTO users SET ?', data, (err, res) => {
        if(err) throw err;
        cb(res);
    });
    return (db);
};

exports.patchUser = (data, id, cb) => {
    db.query('UPDATE users SET ? WHERE id=?', [data, id], (err, res) => {
        if (err) throw err;
        cb(res);
    });
    return(db);
};

exports.deleteUser = (id, cb) => {
    db.query('DELETE FROM users WHERE id = ?',[id], (err, res)=>{
        if(err) throw err;
        cb(res);
    });
};