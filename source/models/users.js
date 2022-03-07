const db = require('../helpers/db');

exports.countUsers = (fin, cb) => {
  db.query(`SELECT COUNT(*) as total FROM users WHERE name LIKE '%${fin.name}%' AND address LIKE '%${fin.address}%' LIMIT ${fin.limit}`, (err, res) => {
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

exports.getUserCheckName = (data) => new Promise((resolve, reject) => {
  db.query('SELECT name FROM users WHERE name = ?', [data.name],
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
});

exports.getUserCheckEmail = (data) => new Promise((resolve, reject) => {
  db.query('SELECT name FROM users WHERE email = ?', [data.email], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getUserCheckUsername = (data) => new Promise((resolve, reject) => {
  db.query('SELECT name FROM users WHERE username = ?', [data.username], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

// exports.postUser = (data, cb) =>{
//     db.query('INSERT INTO users SET ?', data, (err, res) => {
//         if(err) throw err;
//         cb(res);
//     });
//     return (db);
// };

exports.postUser = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO users (gender, address, phone, birthdate) VALUES ('${data.gender}', '${data.address}', '${data.phone}', '${data.birthdate}') WHERE id = ?`,
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
});

exports.getEmailByEmail = (email) => new Promise((resolve, reject) => {
  db.query('SELECT id, email, password FROM users WHERE email=? OR email=?', [email, email], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.patchUser = (data, id, cb) => {
  db.query('UPDATE users SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
  return (db);
};

exports.deleteUser = (id, cb) => {
  db.query('DELETE FROM users WHERE id = ?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.register = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO users (name, email,  username, password) VALUES ('${data.name}', '${data.email}', '${data.username}', '${data.password}')`,
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
});

exports.registerByUsername = (username) => new Promise((resolve, reject) => {
  db.query('SELECT id, email, username, password FROM users WHERE username = ? OR email = ?', [username, username], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updateUser = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE `users` SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});