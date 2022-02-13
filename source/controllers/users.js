const userModel = require('../models/users');
const { APP_URL } = process.env;
const upload = require('../helpers/upload').single('image');

exports.getUsers = (req, res) => {
  let { name, address, page, limit } = req.query;
  name = name || '';
  address = address || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const fin = { name, address, page, limit, offset };
  userModel.getUsers(fin, results => {
    userModel.countUsers(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return res.json({
          success: true,
          message: 'List Users',
          results: results,
          pageInfo: {
            prev: page > 1 ? `http://localhost:3000/users?page=${page - 1}` : null,
            next: page < last ? `http://localhost:3000/users?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Users list not found',
          pageInfo: {
            prev: page > 1 ? `http://localhost:3000/users?page=${page - 1}` : null,
            next: page < last ? `http://localhost:3000/users?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        });
      }
    });
  });
};

exports.getUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send({
      success: false,
      message: 'Invalid input, Id must be number!'
    });
  }
  if (id > 0) {
    userModel.getUser(id, results => {
      if (results.length > 0) {
        return res.json({
          success: true,
          message: 'Detail user',
          results: results[0]
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `User with ID: ${id} not found`
        });
      }
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'Id should be a number greater than 0'
    });
  }
};

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
  userModel.getUserCheck(data, results => {
    if (results.length < 1) {
      userModel.postUser(data, (results => {
        if (results.affectedRows == 1) {
          userModel.getUser(results.insertId, (temp) => {
            return res.send({
              success: true,
              messages: 'Input data user success!',
              results: temp[0]
            });
          });
        } else {
          return res.status(500).send({
            success: false,
            message: 'Input data user failed!'
          });
        }
      }));
    } else {
      return res.status(400).send({
        success: false,
        message: 'Data has already inserted!'
      });
    }
  });
};

// exports.postUser = async (req, res) => {
//     const { name, email, username, password : rawPassword, gender, address, phone, birthdate} = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(rawPassword, salt);
//     const result = await userModel.postUser({ name, email, username, password, gender, address, phone, birthdate});
//     const get = await userModel.getPostUser();
//     if (result.affectedRows >= 1){
//         return res.send({
//             success: true,
//             message: 'Data User Posted',
//             result: get
//         });
//     } else {
//         return res.status(500).send({
//             success: false,
//             message: 'Data not Posted'
//         });
//     }
// };

exports.patchUser = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Invalid input, Id must be number!'
      });
    }
    if (id > 0) {
      userModel.getUser(id, (results => {
        if (results.length > 0) {
          const data = {};
          const fillable = ['gender', 'address', 'phone', 'birthdate'];
          fillable.forEach(field => {
            data[field] = req.body[field];
          });
          if (req.file) {
            data.image = req.file.path;
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
                return res.send({
                  success: true,
                  messages: 'Updated data user success!',
                  results: mapResults[0]
                });
              });
            } else {
              return res.status(500).send({
                success: false,
                message: 'Data user updated failed!'
              });
            }
          }));
        } else {
          return res.status(404).json({
            success: false,
            message: `User with ID: ${id} not found`
          });
        }
      }));
    } else {
      return res.status(400).send({
        success: false,
        message: 'Id should be a number greater than 0'
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send({
      success: false,
      message: 'Invalid input, Id must be number!'
    });
  }
  if (id > 0) {
    userModel.getUser(id, (results => {
      if (results.length > 0) {
        userModel.deleteUser(id, (results => {
          if (results.affectedRows == 1) {
            return res.send({
              success: true,
              message: 'Data user deleted success!'
            });
          } else {
            return res.status(500).send({
              success: false,
              message: 'Data user delete failed!'
            });
          }
        }));
      } else {
        return res.status(404).json({
          success: false,
          message: `User with ID: ${id} not found`
        });
      }
    }));
  } else {
    return res.status(400).send({
      success: false,
      message: 'Id should be a number greater than 0'
    });
  }
};