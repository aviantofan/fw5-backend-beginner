const db = require('../helpers/db');

exports.countCategories = (fin, cb) => {
  db.query(`SELECT COUNT(*) as total FROM categories WHERE name LIKE '%${fin.name}%' LIMIT ${fin.limit}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getCategories = (fin, cb) => {
  db.query(`SELECT id, image, name, createdAt, updatedAt FROM categories WHERE name LIKE '%${fin.name}%' LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
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

exports.getCategoryCheck = (data, cb) => {
  db.query('SELECT name FROM categories WHERE name = ?', [data.name], (err, res) => {
    if (err) throw err;
    cb(res);
  });
  return (db);
};

exports.postCategory = (data, cb) => {
  db.query('INSERT INTO categories SET ?', [data], (err, res) => {
    if (err) throw err;
    cb(res);
  });
  return (db);
};

exports.patchCategory = (data, id, cb) => {
  db.query('UPDATE categories SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
  return (db);
};

exports.deleteCategory = (id, cb) => {
  db.query('DELETE FROM categories WHERE id = ?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};