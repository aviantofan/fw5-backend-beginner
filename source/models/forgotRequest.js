const db = require('../helpers/db');

exports.createRequest = (userId, code) => new Promise((resolve, reject) => {
  db.query('INSERT INTO forgotrequest (userId, code) VALUES (?,?)', [userId, code], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.updateRequest = (data, id) => new Promise((resolve, reject) => {
  db.query('UPDATE `forgotrequest` SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getRequest = (code) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM forgotrequest WHERE code=?', [code], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});

exports.getUser = (id) => new Promise((resolve, reject) => {
  db.query('SELECT id, username, email, password FROM users WHERE id = ?', [id], (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});