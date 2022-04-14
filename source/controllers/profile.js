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
      return res.json({
        success: true,
        message: `User profile with ID: ${id}`,
        result: results[0]
      });
    } else {
      return res.status(404).send({
        success: false,
        message: `User with ID: ${id} not found`
      });
    }
  });

};

module.exports = { getProfile };