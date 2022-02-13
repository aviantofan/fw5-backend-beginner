const response = require('../helpers/response');
const userModel = require('../models/users');
const forgotRequestModel = require('../models/forgotRequest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../helpers/mail');
const { APP_SECRET, APP_EMAIL } = process.env;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await userModel.getUserByUsername(username);
  if (result.length === 1) {
    const { password: hash } = result[0];
    const fin = await bcrypt.compare(password, hash);
    if (fin) {
      const token = jwt.sign({ id: result[0].id }, APP_SECRET);
      return res.json({
        success: true,
        message: 'Login Success!',
        result: { token }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Wrong username or password!'
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: 'Wrong username or password!'
    });
  }
};

exports.register = async (req, res) => {
  const { name, email, username, password: rawPassword } = req.body;
  const results = await userModel.getUserCheckName({ name });
  if (results.length < 1) {
    const results = await userModel.getUserCheckEmail({ email });
    if (results.length < 1) {
      const results = await userModel.getUserCheckUsername({ username });
      if (results.length < 1) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(rawPassword, salt);
        const result = await userModel.register({ name, email, username, password });
        await userModel.registerByUsername(username);
        if (result.affectedRows >= 1) {
          return res.send({
            success: true,
            message: 'Register Success!',
          });
        } else {
          return res.status(500).send({
            success: false,
            message: 'Register Failed!'
          });
        }
      } else {
        return res.status(400).send({
          success: false,
          message: 'Username already used!'
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: 'Email already used!'
      });
    }
  } else {
    return res.status(400).send({
      success: false,
      message: 'Name already used!'
    });
  }
};

exports.verify = (req, res) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        if (jwt.verify(token, APP_SECRET)) {
          return response(res, 'User verified!');
        } else {
          return response(res, 'User not verified!', null, 403);
        }
      } catch (err) {
        return response(res, 'User not verified!', null, 403);
      }
    } else {
      return response(res, 'Token must be provided!', null, 403);
    }
  }
};

exports.forgotPassword = async (req, res) => {
  const { email, code, password, confirmPassword } = req.body;
  if (!code) {
    const user = await userModel.getUserByUsername(email);
    if (user.length === 1) {
      const randomCode = Math.floor(Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1));
      const reset = await forgotRequestModel.createRequest(user[0].id, randomCode);
      if (reset.affectedRows >= 1) {
        const info = await mail.sendMail({
          from: APP_EMAIL,
          to: email,
          subject: 'Reset Your Password | Backend Beginner',
          text: String(randomCode),
          html: `<b> This is ${randomCode} your code for reset your password! DO NOT GIVE THIS CODE TO OTHERS!</b>`
        });
        console.log(info.messageId);
        return response(res, 'Forgot Password request has been sent to your email!');
      } else {
        return response(res, 'Unexpected Error', null, 500);
      }
    } else {
      return response(res, 'If you registered, reset password code will sended to your email!');
    }
  } else {
    if (email) {
      const result = await forgotRequestModel.getRequest(code);
      if (result.length === 1) {
        if (result[0].isExpired) {
          return response(res, 'Expired code', null, 400);
        }
        const user = await forgotRequestModel.getUser(result[0].userId);
        if (user[0].email === email) {
          if (password) {
            if (password === confirmPassword) {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(password, salt);
              const update = await userModel.updateUser({ password: hash }, user[0].id);
              if (update.affectedRows === 1) {
                await forgotRequestModel.updateRequest({ isExpired: 1 }, result[0].id);
                return response(res, 'Password has been reset!');
              } else {
                return response(res, 'Unexpected Error', null, 500);
              }
            } else {
              return response(res, 'Confirm password not same as password', null, 400);
            }
          } else {
            return response(res, 'Password is mandatory!', null, 400);
          }
        } else {
          console.log(user);
          return response(res, 'Invalid Email', null, 400);
        }
      } else {
        return response(res, 'Invalid code', null, 400);
      }
    } else {
      return response(res, 'You have to provide Confirmation Code', null, 400);
    }
  }
};