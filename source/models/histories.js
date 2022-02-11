const db = require('../helpers/db');

exports.countHistories = (fin, cb) => {
  db.query(`SELECT COUNT(*) as total FROM histories h LEFT JOIN users u ON h.userId = u.id LEFT JOIN vehicles v ON h.vehicleId = V.id WHERE u.name LIKE '%${fin.userName}%' AND v.name LIKE '%${fin.vehicleName}%' LIMIT ${fin.limit}` , (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getHistories = (fin, cb) => {
  db.query(`SELECT h.id, u.name AS userName, v.name AS vehicleName, h.rentStartDate, h.rentEndDate, h.isReturned  FROM histories h LEFT JOIN users u ON h.userId = u.id LEFT JOIN vehicles v ON h.vehicleId = V.id WHERE u.name LIKE '%${fin.userName}%' AND v.name LIKE '%${fin.vehicleName}%' LIMIT ${fin.limit} OFFSET ${fin.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

exports.getHistory = (id, cb) => {
  db.query('SELECT h.id, u.name AS userName, v.name AS vehicleName, h.rentStartDate, h.rentEndDate, h.isReturned  FROM histories h LEFT JOIN users u ON h.userId = u.id LEFT JOIN vehicles v ON h.vehicleId = V.id WHERE h.id=?', [id], (err, res) => {
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

exports.popularBasedonMonth = (data, cb) => {
  db.query(`SELECT COUNT(*) AS mostPopular, h.vehicleId AS idVehicle, v.name AS vehicleName, c.name AS Category, MONTH(h.createdAt) AS Month FROM histories h LEFT JOIN vehicles v ON v.id = h.vehicleId LEFT JOIN categories c ON v.categoryId=c.id WHERE MONTH(h.createdAt) = '${data.month}' AND YEAR(h.createdAt) = '${data.year}' GROUP BY h.vehicleId ORDER BY COUNT(*) DESC`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};