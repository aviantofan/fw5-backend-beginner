const db = require('../helpers/db');

exports.countVehicles = (fin, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE name LIKE '%${fin.name}%'AND loc LIKE '%${fin.location}%' LIMIT ${fin.limit}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getPopulars = (cb) => {
  db.query('SELECT h.vehicleId, v.name AS vehicleName, COUNT(*) AS rentCount FROM histories h LEFT JOIN vehicles v ON v.id=h.vehicle_id GROUP BY h.vehicle_id HAVING count(*) > 3 ORDER BY rentCount DESC', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicles = (fin, cb) => {
  db.query(`SELECT v.id, v.image, v.name, v.color, v.loc, v.isAvailable, v.isPrepay, v.capacity, c.name AS categoryName, v.reservationBefore, v.price, v.price*50/100 AS minPrepayment, v.qty, v.createdAt, v.updatedAt FROM vehicles v LEFT JOIN categories c ON v.categoryId=c.id WHERE v.name LIKE '%${fin.name}%' AND v.loc LIKE '%${fin.location}%' LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicle = (id, cb) => {
  db.query('SELECT v.id, v.image, v.name, v.color, v.loc, v.isAvailable, v.isPrepay, v.capacity, c.name AS categoryName, v.reservationBefore, v.price, v.price*50/100 AS minPrepayment, v.qty, v.createdAt, v.updatedAt FROM vehicles v LEFT JOIN categories c ON v.categoryId=c.id WHERE v.id=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehiclesCategory = (fin, cb) => {
  db.query(`SELECT v.id, v.name, v.loc FROM vehicles v LEFT JOIN categories c ON v.categoryId=c.id WHERE c.name LIKE '%${fin.categoryName}%' LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getVehicleCheck = (data, cb) => {
  db.query('SELECT name FROM vehicles WHERE name = ?', [data.name], (err, res) => {
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