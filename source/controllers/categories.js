const categoryModel = require('../models/categories');
const { APP_URL } = process.env;
const upload = require('../helpers/upload').single('image');

exports.getCategories = (req, res) => {
  let { name, page, limit } = req.query;
  name = name || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;
  const fin = { name, page, limit, offset };
  categoryModel.getCategories(fin, results => {
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${APP_URL}/${obj.image}`;
      }
      return obj;
    });
    categoryModel.countCategories(fin, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      if (results.length > 0) {
        return res.json({
          success: true,
          message: 'List Categories',
          results: results,
          pageInfo: {
            prev: page > 1 ? `http://localhost:3000/vehicles?page=${page - 1}` : null,
            next: page < last ? `http://localhost:3000/vehicles?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Categories list not found',
          pageInfo: {
            prev: page > 1 ? `http://localhost:3000/vehicles?page=${page - 1}` : null,
            next: page < last ? `http://localhost:3000/vehicles?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        });
      }
    });
  });
};

exports.getCategory = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send({
      success: false,
      message: 'Invalid input, Id must be number!'
    });
  }
  if (id == '') {
    return res.status(400).send({
      success: false,
      message: 'Id cannot empty!'
    });
  }
  if (id > 0) {
    categoryModel.getCategory(id, results => {
      if (results.length > 0) {
        return res.json({
          success: true,
          message: 'Detail Category',
          results: results[0]
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `category with ID: ${id} not found`
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

exports.postCategory = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    const data = {
      name: req.body.name
    };
    if (req.file) {
      data.image = req.file.path;
    }
    categoryModel.getCategoryCheck(data, results => {
      if (results.length < 1) {
        categoryModel.postCategory(data, (results => {
          if (results.affectedRows == 1) {
            categoryModel.getCategories(results.insertId, (temp) => {
              const mapResults = temp.map(o => {
                if (o.image !== null) {
                  o.image = `${APP_URL}/${o.image}`;
                }
                return o;
              });
              return res.send({
                success: true,
                messages: 'Input data category success!',
                results: mapResults[0]
              });
            });
          } else {
            return res.status(500).send({
              success: false,
              message: 'Input data category failed!'
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
  });
};

exports.patchCategory = (req, res) => {
  // const history = [];
  // const data = {
  //   name: req.body.name
  // };
  // history.push(data);
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send({
      success: false,
      message: 'Invalid input, Id must be number!'
    });
  }
  if (id == '') {
    return res.status(400).send({
      success: false,
      message: 'Id cannot empty!'
    });
  }
  if (id > 0) {
    categoryModel.getCategory(id, (results => {
      if (results.length > 0) {
        const data = {};
        const fillable = ['image', 'name'];
        fillable.forEach(field => {
          data[field] = req.body[field];
        });
        categoryModel.patchCategory(data, id, (results => {
          if (results.affectedRows == 1) {
            categoryModel.getCategory(id, (results => {
              return res.send({
                success: true,
                messages: 'Updated data category success!',
                results: results[0]
              });
            }));
          } else {
            return res.status(500).send({
              success: false,
              message: 'Data category updated failed!'
            });
          }
        }));
      } else {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
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


exports.deleteCategory = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send({
      success: false,
      message: 'Invalid input, Id must be number!'
    });
  }
  if (id == '') {
    return res.status(400).send({
      success: false,
      message: 'Id cannot empty!'
    });
  }
  if (id > 0) {
    categoryModel.getCategory(id, (results => {
      if (results.length > 0) {
        categoryModel.deleteCategory(id, (results => {
          if (results.affectedRows == 1) {
            return res.send({
              success: true,
              message: 'Data category deleted success!'
            });
          } else {
            return res.status(500).send({
              success: false,
              message: 'Data category delete failed!'
            });
          }
        }));
      } else {
        return res.status(404).json({
          success: false,
          message: 'category not found'
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