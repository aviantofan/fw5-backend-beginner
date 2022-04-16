const { response } = require('express');
const profileModel = require('../models/profile');
const { APP_URL } = process.env;

const getProfile = (req, res) => {
  const { id } = req.user;
  profileModel.getProfile(id, results => {
    const processedResult = results.map((obj) => {
      if (obj.image !== null) {
        obj.image = `${APP_URL}/${obj.image}`;
      }
      return obj;
    });
    console.log(processedResult);
    if (results.length > 0) {
      return response(res, `User profile with ID: ${id}`, results[0], null);
    } else {
      return response(res, `User with ID: ${id} not found`, null, null, 404);
    }
  });

};

module.exports = { getProfile };