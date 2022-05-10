const db = require('../helpers/db');

exports.countVehicles = (fin, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE name LIKE '%${fin.name}%'AND loc LIKE '%${fin.location}%' LIMIT ${fin.limit}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.countPopular = (fin, cb) => {
  db.query(`SELECT COUNT(*) as total FROM histories h LEFT JOIN vehicles v ON v.id=h.vehicleId WHERE v.name LIKE '%${fin.search}%' LIMIT ${fin.limit}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getPopulars = (fin, cb) => {
  db.query(`SELECT v.id, v.image AS image, v.name AS vehicleName, v.loc AS location, COUNT(*) AS rentCount FROM histories h LEFT JOIN vehicles v ON v.id=h.vehicleId WHERE v.name LIKE '%${fin.search}%' GROUP BY h.vehicleId HAVING COUNT(*) > 3 ORDER BY rentCount DESC LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicles = (fin, cb) => {
  db.query(`SELECT v.id, v.image, v.name, v.color, v.loc, v.isAvailable, v.isPrepay, v.capacity, c.name AS categoryName, v.reservationBefore, v.paymentMethod, v.price, v.price*50/100 AS minPrepayment, v.stock, v.createdAt, v.updatedAt FROM vehicles v LEFT JOIN categories c ON v.categoryId=c.id WHERE v.name LIKE '%${fin.name}%' AND v.loc LIKE '%${fin.location}%' AND v.paymentMethod LIKE '%${fin.paymentMethod}%' AND c.id LIKE '%${fin.categoryId}%' ORDER BY ${fin.sort} ${fin.order} LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicle = (id, cb) => {
  db.query('SELECT v.id, v.image, v.name, v.color, v.loc, v.isAvailable, v.isPrepay, v.capacity, c.name AS categoryName, v.categoryId, v.reservationBefore, v.paymentMethod, v.price, v.price*50/100 AS minPrepayment, v.stock, v.createdAt, v.updatedAt FROM vehicles v LEFT JOIN categories c ON v.categoryId=c.id WHERE v.id=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehiclesCategory = (fin, cb) => {
  db.query(`SELECT v.id, v.image, v.name, v.loc FROM vehicles v LEFT JOIN categories c ON v.categoryId=c.id WHERE v.name LIKE '%${fin.name}%' AND v.loc LIKE '%${fin.location}%' AND c.id LIKE '%${fin.categoryId}%' ORDER BY ${fin.sort} ${fin.order} LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicleCheck = (data, cb) => {
  db.query('SELECT name, loc, color FROM vehicles WHERE name = ? AND loc =? AND color=?', [data.name, data.loc, data.color], (err, res) => {
    if (err) throw err;
    cb(res);
  });
  return (db);
};

exports.postVehicle = (data, cb) => {
  db.query('INSERT INTO vehicles SET ?', data, (err, res) => {
    if (err) throw err;
    cb(res);
  });
  return (db);
};

exports.patchVehicle = (data, id, cb) => {
  db.query('UPDATE vehicles SET ? WHERE id=?', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
  return (db);
};

exports.deleteVehicle = (id, cb) => {
  db.query('DELETE FROM vehicles WHERE id = ?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};