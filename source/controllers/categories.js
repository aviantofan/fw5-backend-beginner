const categoryModel = require('../models/categories');
const response = require('../helpers/response');
const validator = require('validator');
const { APP_URL } = process.env;

exports.postCategory = (req, res) => {
  const data = {
    name: req.body.name
  };
  if (!validator.isEmpty(data.name)) {
    categoryModel.getCategoryCheck(data, results => {
      if (results.length < 1) {
        categoryModel.postCategory(data, (results => {
          if (results.affectedRows == 1) {
            categoryModel.getCategory(results.insertId, (results) => {
              return response(res, 'Input data category success!', results[0], null);
            });
          } else {
            return response(res, 'Input data category failed!', null, null, 500);
          }
        }));
      } else {
        return response(res, 'Data has already inserted!', null, null, 400);
      }
    });
  } else {
    return response(res, 'Name cannot empty!', null, null, 400);
  }
};

exports.getCategories = (req, res) => {
  let { name, page, limit } = req.query;
  name = name || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const fin = { name, page, limit, offset };
  categoryModel.getCategories(fin, results => {
    categoryModel.countCategories(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return response(res, 'List Categories', results, {
          prev: page > 1 ? `${APP_URL}/categories?page=${page - 1}` : null,
          next: page < last ? `${APP_URL}/categories?page=${page + 1}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last
        });
      } else {
        return response(res, 'Categories list not found', null, 404);
      }
    });
  });
};

exports.getCategory = (req, res) => {
  const id = req.params.id;
  if (validator.isInt(id)) {
    if (!validator.isEmpty(id)) {
      if (id > 0) {
        categoryModel.getCategory(id, results => {
          if (results.length > 0) {
            return response(res, 'Detail Category', results[0], null);
          } else {
            return response(res, `category with ID: ${id} not found`, null, null, 404);
          }
        });
      } else {
        return response(res, 'Id should be a number greater than 0', null, null, 400);
      }
    } else {
      return response(res, 'Id cannot empty!', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
};

exports.patchCategory = (req, res) => {
  const id = req.params.id;
  if (validator.isInt(id)) {
    if (!validator.isEmpty(id)) {
      if (id > 0) {
        categoryModel.getCategory(id, (results => {
          if (results.length > 0) {
            const data = {};
            const fillable = ['name'];
            fillable.forEach(field => {
              if (req.body[field]) {
                data[field] = req.body[field];
              }
            });
            categoryModel.patchCategory(data, id, (results => {
              if (results.affectedRows == 1) {
                categoryModel.getCategory(id, (results => {
                  return response(res, 'Updated data category success!', results[0], null);
                }));
              } else {
                return response(res, 'Data category updated failed!', null, null, 500);
              }
            }));
          } else {
            return response(res, 'Category not found', null, null, 404);
          }
        }));
      } else {
        return response(res, 'Id should be a number greater than 0', null, null, 400);
      }
    } else {
      return response(res, 'Id cannot empty!', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
};


exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  if (validator.isInt(id)) {
    if (!validator.isEmpty(id)) {
      if (id > 0) {
        categoryModel.getCategory(id, (results => {
          if (results.length > 0) {
            categoryModel.deleteCategory(id, (results => {
              if (results.affectedRows == 1) {
                return response(res, 'Data category deleted success!', null, null);
              } else {
                return response(res, 'Data category delete failed!', null, null, 500);
              }
            }));
          } else {
            return response(res, 'category not found', null, null, 404);
          }
        }));
      } else {
        return response(res, 'Id should be a number greater than 0', null, null, 400);
      }
    } else {
      return response(res, 'Id cannot empty!', null, null, 400);
    }
  } else {
    return response(res, 'Invalid input, Id must be number!', null, null, 400);
  }
};