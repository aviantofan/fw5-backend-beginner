const vehicleModel = require('../models/vehicles');
const { APP_URL, CLOUD_URL} = process.env;
const upload = require('../helpers/upload').single('image');
const response = require('../helpers/response');
const moment = require('moment');
const validator = require('validator');
const auth = require('../helpers/auth');

exports.postVehicle = (req, res) => {
  upload(req, res, (err) => {
    auth.verifyAdmin(req, res, function (Error) {
      if (err) {
        return response(res, err.message, null, null, 400);
      }
      const data = {
        name: req.body.name,
        color: req.body.color,
        loc: req.body.loc,
        isAvailable: req.body.isAvailable,
        capacity: req.body.capacity,
        categoryId: req.body.categoryId,
        reservationBefore: req.body.reservationBefore,
        paymentMethod: req.body.paymentMethod,
        price: req.body.price,
        stock: req.body.stock
      };
      if (validator.isEmpty(data.name)) {
        return response(res, 'Name cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.color)) {
        return response(res, 'Color cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.loc)) {
        return response(res, 'Location cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.isAvailable)) {
        return response(res, 'Status cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.capacity)) {
        return response(res, 'Capacity cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.categoryId)) {
        return response(res, 'Category cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.reservationBefore)) {
        return response(res, 'Reservation deadline cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.paymentMethod)) {
        return response(res, 'paymentMethod cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.price)) {
        return response(res, 'Price cannot empty!', null, null, 400);
      }
      if (validator.isEmpty(data.stock)) {
        return response(res, 'Stock cannot empty!', null, null, 400);
      }
      if (validator.isInt(data.isAvailable)) {
        if (validator.isInt(data.capacity)) {
          if (validator.isInt(data.categoryId)) {
            if (validator.isInt(data.price)) {
              if (validator.isInt(data.stock)) {
                if (req.file) {
                  data.image = `${req.file.filename}`;
                }
                vehicleModel.getVehicleCheck(data, results => {
                  if (results.length < 1) {
                    vehicleModel.postVehicle(data, (results => {
                      if (results.affectedRows == 1) {
                        vehicleModel.getVehicle(results.insertId, (temp) => {
                          const mapResults = temp.map(o => {
                            if (o.image !== null) {
                              o.image = `${CLOUD_URL}/${o.image}`;
                            }
                            return o;
                          });
                          return response(res, 'Input data vehicle success!', mapResults[0], null);
                        });
                      } else {
                        return response(res, 'Input data vehicle failed!', null, null, 500);
                      }
                    }));
                  } else {
                    return response(res, 'Data has already inserted!', null, null, 400);
                  }
                });
              } else {
                return response(res, 'Invalid input, Stock must be a Number!', null, null, 400);
              }
            } else {
              return response(res, 'Invalid input, Price must be a Number!', null, null, 400);
            }
          } else {
            return response(res, 'Invalid input, CategoryId must be a Number!', null, null, 400);
          }
        } else {
          return response(res, 'Invalid input, Capacity must be a Number!', null, null, 400);
        }
      } else {
        return response(res, 'Invalid input, isAvailable must be a Number!', null, null, 400);
      }
    });
  });
};

exports.getPopulars = (req, res) => {
  let { search, page, sort, order, limit } = req.query;
  search = search || '';
  sort = sort || 'createdAt';
  order = order || 'desc';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const fin = { search, page, sort, order, limit, offset };
  vehicleModel.getPopulars(fin, results => {
    results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${CLOUD_URL}/${obj.image}`;
      }
      return obj;
    });
    vehicleModel.countPopular(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return response(res, 'List Populars', results, {
          prev: page > 1 ? `${APP_URL}/vehicles/p/populars?page=${page - 1}&limit=${limit}` : null,
          next: page < last ? `${APP_URL}/vehicles/p/populars?page=${page + 1}&limit=${limit}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last
        }
        );
      } else {
        return response(res, 'Populars list not found', null, null, 404);
      }
    });
  });
};

exports.getVehicles = (req, res) => {
  let { name, location, paymentMethod, categoryId, sort, order, page, limit } = req.query;
  name = name || '';
  location = location || '';
  paymentMethod = paymentMethod || '';
  categoryId = categoryId || '';
  sort = sort || 'createdAt';
  order = order || 'desc';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 4;
  const offset = (page - 1) * limit;
  const fin = { name, location, paymentMethod, categoryId, sort, page, order, limit, offset };
  vehicleModel.getVehicles(fin, results => {
    results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${CLOUD_URL}/${obj.image}`;
      }
      return obj;
    });
    vehicleModel.countVehicles(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return response(res, 'List Vehicles', results, {
          prev: page > 1 ? `${APP_URL}/vehicles?page=${page - 1}` : null,
          next: page < last ? `${APP_URL}/vehicles?page=${page + 1}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last
        });
      } else {
        return response(res, 'Vehicles list not found', null, null, 404);
      }
    });
  });
};

exports.getVehiclesCategory = (req, res) => {
  let { name, location,  paymentMethod, categoryId, page, limit } = req.query;
  name = name || '';
  location = location || '';
  paymentMethod = paymentMethod || '';
  categoryId = categoryId || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const fin = { name, location, paymentMethod, categoryId, page, limit, offset };
  vehicleModel.getVehiclesCategory(fin, results => {
    results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${CLOUD_URL}/${obj.image}`;
      }
      return obj;
    });
    vehicleModel.countVehicles(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return response(res, 'List Vehicles Category', results, {
          prev: page > 1 ? `${APP_URL}/vehicles/category?categoryId=${categoryId}&page=${page - 1}&limit=${limit}` : null,
          next: page < last ? `${APP_URL}/vehicles/category?categoryId=${categoryId}&page=${page + 1}&limit=${limit}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last
        }
        );
      } else {
        return response(res, 'Vehicles Category list not found', null, null, 404);
      }
    });
  });
};

exports.getVehicle = (req, res) => {
  const { id } = req.params;
  if (validator.isInt(id)) {
    if (id > 0) {
      vehicleModel.getVehicle(id, results => {
        results.map((obj) => {
          if (obj.image !== null) {
            obj.image = `${CLOUD_URL}/${obj.image}`;
          }
          obj.reservationBefore = moment(obj.reservationBefore, 'HH:mm:ss').format('HH:mm');
          return obj;
        });
        if (results.length > 0) {
          return response(res, 'Detail Vehicle', results[0], null);
        } else {
          return response(res, `Vehicle with ID: ${id} not found`, null, null, 404);
        }
      });
    } else {
      return response(res, 'Id should be a number greater than 0', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
};

exports.patchVehicle = (req, res) => {
  upload(req, res, (err) => {
    auth.verifyAdmin(req, res, function (Error) {
      if (err) {
        return response(res, err.message, null, null, 400);
      }
      const id = req.params.id;
      if (validator.isInt(id)) {
        if (!validator.isEmpty(id)) {
          if (id > 0) {
            vehicleModel.getVehicle(id, (results => {
              if (results.length > 0) {
                const data = {};
                const fillable = ['name', 'color', 'loc', 'isAvailable', 'isPrepay', 'capacity', 'reservationBefore', 'paymentMethod', 'price', 'stock'];
                fillable.forEach(field => {
                  if (req.body[field]) {
                    data[field] = req.body[field];
                  }
                });
                if (req.file) {
                  data.image = `${req.file.filename}`;
                }
                vehicleModel.patchVehicle(data, id, (results => {
                  if (results.affectedRows == 1) {
                    vehicleModel.getVehicle(id, (temp) => {
                      const mapResults = temp.map(o => {
                        if (o.image !== null) {
                          o.image = `${CLOUD_URL}/${o.image}`;
                        }
                        o.reservationBefore = moment(o.reservationBefore, 'HH:mm:ss').format('HH:mm');
                        return o;
                      });
                      return response(res, 'Updated data vehicle success!', mapResults[0], null);
                    });
                  } else {
                    return response(res, 'Data vehicle updated failed!', null, null, 500);
                  }
                }));
              } else {
                return response(res, `Vehicle with ID : ${id} not found`, null, null, 404);
              }
            }));
          } else {
            return response(res, 'Id should be a number greater than 0', null, null, 400);
          }
        } else { return response(res, 'Id cannot empty!', null, null, 400); }
      } else {
        return response(res, 'Invalid input, Id must be number!', null, null, 400);
      }
    });
  });
};

exports.deleteVehicle = (req, res) => {
  const id = req.params.id;
  if (!validator.isEmpty(id)) {
    if (validator.isInt(id)) {
      vehicleModel.getVehicle(id, (results => {
        if (id > 0) {
          if (results.length > 0) {
            vehicleModel.deleteVehicle(id, (results => {
              if (results.affectedRows > 0) {
                return response(res, 'Data vehicle deleted success!', null, null,);
              } else {
                return response(res, 'Data vehicle delete failed!', null, null, 500);
              }
            }));
          } else {
            return response(res, `Vehicle with ID : ${id} not found`, null, null, 404);
          }
        } else {
          return response(res, 'Id should be a number greater than 0', null, null, 400);
        }
      }));
    } else {
      return response(res, 'Invalid input, Id must be number!', null, null, 400);
    }
  } else {
    return response(res, 'Id cannot empty!', null, null, 400);
  }
};