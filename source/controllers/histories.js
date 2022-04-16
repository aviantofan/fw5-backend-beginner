const historyModel = require('../models/histories');
const response = require('../helpers/response');
const validator = require('validator');
const { APP_URL } = process.env;

exports.postHistory = (req, res) => {
  const data = {
    userId: req.body.userId,
    vehicleId: req.body.vehicleId,
    rentStartDate: req.body.rentStartDate,
    rentEndDate: req.body.rentEndDate,
    prepayment: req.body.prepayment,
    isReturned: req.body.isReturned
  };
  if (validator.isEmpty(data.userId)) {
    return response(res, 'User Id cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.vehicleId)) {
    return response(res, 'Vehicle Id cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.rentStartDate)) {
    return response(res, 'Rent Start Date cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.rentEndDate)) {
    return response(res, 'Rent End Date cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.prepayment)) {
    return response(res, 'Prepayment cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.isReturned)) {
    return response(res, 'Is Returned cannot empty!', null, null, 400);
  }
  if (validator.isInt(data.userId)) {
    if (validator.isInt(data.vehicleId)) {
      if (validator.isDate(data.rentStartDate)) {
        if (validator.isDate(data.rentEndDate)) {
          if (validator.isInt(data.prepayment)) {
            if (validator.isInt(data.isReturned)) {
              historyModel.postHistory(data, (results => {
                if (results.affectedRows == 1) {
                  historyModel.getHistory(results.insertId, (temp) => {
                    return response(res, 'Input data history success!', temp[0], null);
                  });
                } else {
                  return response(res, 'Input data history failed!', null, null, 500);
                }
              }));
            } else {
              return response(res, 'Invalid input, Is Returned must be number!', null, null, 400);
            }
          } else {
            return response(res, 'Invalid input, Prepayment must be number!', null, null, 400);
          }
        } else {
          return response(res, 'Invalid input, Rent End Date format', null, null, 400);
        }
      } else {
        return response(res, 'Invalid input, Rent Start Date format', null, null, 400);
      }
    } else {
      return response(res, 'Invalid input, Vehicle Id must be number!', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, User Id must be number!', null, null, 400);
  }
};

exports.getHistories = (req, res) => {
  let { userName, vehicleName, page, limit } = req.query;
  userName = userName || '';
  vehicleName = vehicleName || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const fin = { userName, vehicleName, page, limit, offset };
  historyModel.getHistories(fin, results => {
    historyModel.countHistories(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return response(res, 'List Histories', results, {
          prev: page > 1 ? `http://localhost:50000/histories?page=${page - 1}` : null,
          next: page < last ? `http://localhost:5000/histories?page=${page + 1}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last
        });
      } else {
        return response(res, 'History list not found', null, null, 404);
      }
    });
  });
};

exports.getHistory = (req, res) => {
  const id = req.params.id;
  if (validator.isInt(id)) {
    if (id > 0) {
      historyModel.getHistory(id, results => {
        const processedResult = results.map((obj) => {
          if (obj.image !== null) {
            obj.image = `${APP_URL}/${obj.image}`;
          }
          return obj;
        });
        console.log(processedResult);
        if (results.length > 0) {
          return response(res, 'List History Users', results, null);
        } else {
          return response(res, `User history with ID: ${id} not found`, null, null, 404);
        }
      });
    } else {
      return response(res, 'Id should be a number greater than 0', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
};

exports.patchHistory = (req, res) => {
  const data = {
    user_id: parseInt(req.body.user_id) || null,
    vehicle_id: parseInt(req.body.vehicle_id) || null,
    rentStartDate: req.body.rentStartDate,
    rentEndDate: req.body.rentEndDate,
    prepayment: req.body.prepayment,
    isReturned: req.body.isReturned
  };
  const id = parseInt(req.params.id);
  if (!id) {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
  if (id > 0) {
    historyModel.getHistory(id, (results => {
      if (results.length > 0) {
        historyModel.patchHistory(data, id, (results => {
          if (results.affectedRows == 1) {
            historyModel.getHistory(id, (results => {
              return response(res, 'Updated data history success!', results[0], null);
            }));
          } else {
            return response(res, 'Data history updated failed!', null, null, 500);
          }
        }));
      } else {
        return response(res, `History with ID: ${id} not found`, null, null, 404);
      }
    }));
  } else {
    return response(res, 'Id should be a number greater than 0', null, null, 404);
  }
};


exports.deleteHistory = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
  if (id > 0) {
    historyModel.getHistory(id, (results => {
      if (results.length > 0) {
        historyModel.deleteHistory(id, (results => {
          if (results.affectedRows == 1) {
            return response(res, 'Data user deleted success!', null, null);
          } else {
            return response(res, 'Data user delete failed!', null, null, 500);
          }
        }));
      } else {
        return response(res, `History with ID: ${id} not found`, null, null, 404);
      }
    }));
  } else {
    return response(res, 'Id should be a number greater than 0', null, null, 400);
  }
};

exports.popularBasedOnMonth = (req, res) => {
  let { month, year } = req.query;
  month = parseInt(month) || null;
  year = parseInt(year) || null;
  const data = { month, year };
  if (!month && !year) {
    return response(res, 'Month and Year must be filled with number', null, null, 400);
  }
  if (!month) {
    return response(res, 'Month must be filled with number', null, null, 404);
  }
  if (!year) {
    return response(res, 'Year must be filled with number', null, null, 400);
  }
  historyModel.popularBasedonMonth(data, (result) => {
    const cekMonth = (month) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const mon = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          let cek = mon.find((item) => {
            return item === month;
          });
          if (cek) {
            resolve(cek);
          } else {
            reject(new Error('Month ' + month + ' does not include month'));
          }
        }, 2000);
      });
    };
    cekMonth(month, year).then((cek) => {
      if (result.length > 0) {
        return response(res, 'Most Popular Vehicles in month ' + cek + ' ' + year, result, null, null);
      } else {
        return response(res, 'Data vehicles not found', null, null, 404);
      }
    }).catch((err) => {
      return response(res, '' + err + '', null, null, 400);
    });
  });
};