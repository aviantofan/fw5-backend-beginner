const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = process.env;

exports.verifyUser = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, APP_SECRET);
        req.user = payload;
        if (payload.role == 'user') {
          if (jwt.verify(token, APP_SECRET)) {
            return next();
          } else {
            return response(res, 'User not verified!', null, null, 403);
          }
        } return response(res, 'You don`t have access!', null, null, 403);
      } catch (err) {
        return response(res, 'User not verified!', null, null, 403);
      }
    } else {
      return response(res, 'Token must be provided!', null, null, 403);
    }
  } else {
    return response(res, 'You must login first!', null, null, 403);
  }
};

exports.verifyAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, APP_SECRET);
        req.user = payload;
        if (payload.role == 'admin') {
          if (jwt.verify(token, APP_SECRET)) {
            return next();
          } else {
            return response(res, 'User not verified!', null, null, 403);
          }
        } return response(res, 'You don`t have access!', null, null, 403);
      } catch (err) {
        return response(res, 'User not verified!', null, null, 403);
      }
    } else {
      return response(res, 'Token must be provided!', null, null, 403);
    }
  } else {
    return response(res, 'You must login first!', null, null, 403);
  }
};