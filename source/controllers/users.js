const userModel = require('../models/users');
const { APP_URL } = process.env;
const upload = require('../helpers/upload').single('image');
// const moment = require('moment');
const response = require('../helpers/response');
const validator = require('validator');

exports.postUser = (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
    birthdate: req.body.birthdate
  };
  if (validator.isEmpty(data.name)) {
    return response(res, 'Name cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.email)) {
    return response(res, 'Email cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.username)) {
    return response(res, 'Username cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.password)) {
    return response(res, 'Password cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.gender)) {
    return response(res, 'Gender cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.address)) {
    return response(res, 'Address cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.phone)) {
    return response(res, 'Phone cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(data.birthdate)) {
    return response(res, 'birthdate cannot empty!', null, null, 400);
  }
  if (validator.isEmail(data.email)) {
    if (validator.isStrongPassword(data.password)) {
      if (validator.isInt(data.phone)) {
        if (validator.isMobilePhone(data.phone, 'id-ID')) {
          if (validator.isDate(data.birthdate)) {
            userModel.getUserCheck(data, results => {
              if (results.length < 1) {
                userModel.postUser(data, (results => {
                  if (results.affectedRows == 1) {
                    userModel.getUser(results.insertId, (temp) => {
                      return response(res, 'Input data user success!', temp[0], null);
                    });
                  } else {
                    return response(res, 'Input data user failed!', null, null, 500);
                  }
                }));
              } else {
                return response(res, 'Data has already inserted!', null, null, 400);
              }
            });
          } else {
            return response(res, 'Invalid input, birthdate format is YYYY/MM/DD', null, null, 400);
          }
        } else {
          return response(res, 'Phone is not valid', null, null, 400);
        }
      } else {
        return response(res, 'Invalid input, phone must a number!', null, null, 400);
      }
    } else {
      return response(res, 'Your password must have 8 characters includes Uppercase, Lowercase, Number, and symbol', null, null, 400);
    }
  } else {
    return response(res, 'Your email format is wrong!', null, null, 400);
  }
};

exports.getUsers = (req, res) => {
  let { name, address, sort, order, page, limit } = req.query;
  name = name || '';
  address = address || '';
  page = parseInt(page) || 1;
  sort = sort || 'createdAt';
  order = order || 'desc';
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const fin = { name, address, sort, order, page, limit, offset };
  userModel.getUsers(fin, results => {
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${APP_URL}/${obj.image}`;
      }
      return obj;
    });
    console.log(processedResult);
    userModel.countUsers(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return response(res, 'List Users', results, {
          prev: page > 1 ? `http://localhost:5000/users?page=${page - 1}` : null,
          next: page < last ? `http://localhost:5000/users?page=${page + 1}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last
        });
      } else {
        return response(res, 'Users list not found', null, null, 404);
      }
    });
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  if (validator.isInt(id)) {
    if (id > 0) {
      userModel.getUser(id, results => {
        const processedResult = results.map((obj) => {
          if (obj.image !== null) {
            obj.image = `${APP_URL}/${obj.image}`;
          }
          return obj;
        });
        console.log(processedResult);
        if (results.length > 0) {
          return response(res, 'Detail user', results[0], null);
        } else {
          return res.status(404).json(res, `User with ID: ${id} not found`, null, null, 404);
        }
      });
    } else {
      return res.status(400).send(res, 'Id should be a number greater than 0', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
};

exports.patchUser = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return response(res, err.message, null, null, 400);
    }
    const id = req.params.id;
    if (validator.isInt(id)) {
      if (id > 0) {
        userModel.getUser(id, (results => {
          if (results.length > 0) {
            const data = {};
            const fillable = ['name', 'email', 'username', 'gender', 'address', 'phone', 'birthdate'];
            fillable.forEach(field => {
              if (req.body[field]) {
                data[field] = req.body[field];
              }
            });
            if (req.file) {
              data.image = `uploads/${req.file.filename}`;
            }
            userModel.patchUser(data, id, (results => {
              if (results.affectedRows == 1) {
                userModel.getUser(id, (temp) => {
                  const mapResults = temp.map(o => {
                    if (o.image !== null) {
                      o.image = `${APP_URL}/${o.image}`;
                    }
                    return o;
                  });
                  return response(res, 'Updated data user success!', mapResults[0], null);
                });
              } else {
                return response(res, 'Data user updated failed!', null, null, 500);
              }
            }));
          } else {
            return response(res, `User with ID: ${id} not found`, null, null, 404);
          }
        }));
      } else {
        return response(res, 'Id should be a number greater than 0', null, null, 400);
      }
    } else {
      return response(res, 'Invalid input, Id must be number!', null, null, 400);
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  if (validator.isInt(id)) {
    if (id > 0) {
      userModel.getUser(id, (results => {
        if (results.length > 0) {
          userModel.deleteUser(id, (results => {
            if (results.affectedRows == 1) {
              return response(res, 'Data user deleted success!', null, null);
            } else {
              return response(res, 'Data user delete failed!', null, null, 500);
            }
          }));
        } else {
          return response(res, `User with ID: ${id} not found`, null, null, 404);
        }
      }));
    } else {
      return response(res, 'Id should be a number greater than 0', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
};