const profileModel = require('../models/profile');
const { CLOUD_URL } = process.env;
const response = require('../helpers/response');
const moment = require('moment');

const getProfile = (req, res) => {
  const { id } = req.user;
  profileModel.getProfile(id, results => {
    results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${CLOUD_URL}/${obj.image}`;
      }
      obj.birthdate = moment(obj.birthdate).utc('+7').format('YYYY-MM-DD');
      obj.createdAt = moment(obj.createdAt).utc('+7').format('YYYY');
      return obj;
    });
    if (results.length > 0) {
      return response(res, `User profile with ID: ${id}`, results[0], null);
    } else {
      return response(res, `User with ID: ${id} not found`, null, null, 404);
    }
  });

};

module.exports = { getProfile };