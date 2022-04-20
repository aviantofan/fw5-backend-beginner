const response = require('../helpers/response');
const userModel = require('../models/users');
const forgotRequestModel = require('../models/forgotRequest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../helpers/mail');
const validator = require('validator');
const { APP_SECRET, APP_EMAIL } = process.env;

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const rules = {
    minLength: 6
  };
  if (validator.isEmpty(email)) {
    return response(res, 'Email cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(password)) {
    return response(res, 'Password cannot empty!', null, null, 400);
  }
  if (validator.isEmail(email)) {
    if (validator.isStrongPassword(password, rules)) {
      const result = await userModel.getEmailByEmail(email);
      if (result.length === 1) {
        const { password: hash } = result[0];
        const fin = await bcrypt.compare(password, hash);
        if (fin) {
          const token = jwt.sign({ id: result[0].id }, APP_SECRET);
          return response(res, 'Login Success!', { token }, null);
        } else {
          return response(res, 'Wrong username or password!', null, null, 403);
        }
      } else {
        return response(res, 'Wrong username or password!', null, null, 403);
      }
    } else {
      return response(res, 'Your password must have 6 characters includes Uppercase, Lowercase, Number, and symbol', null, null, 400);
    }
  } else {
    return response(res, 'Your email format is wrong!', null, null, 400);
  }
};

exports.register = async (req, res) => {
  const { name, username, email, password: rawPassword } = req.body;
  const rules = {
    minLength: 6
  };

  if (validator.isEmpty(name)) {
    return response(res, 'Name cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(username)) {
    return response(res, 'Username cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(email)) {
    return response(res, 'Email cannot empty!', null, null, 400);
  }
  if (validator.isEmpty(rawPassword)) {
    return response(res, 'Password cannot empty!', null, null, 400);
  }

  if (validator.isEmail(email)) {
    if (validator.isStrongPassword(rawPassword, rules)) {
      const results = await userModel.getUserCheck({ email, username });
      if (results.length < 1) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(rawPassword, salt);
        const result = await userModel.register({ name, username, email, password });
        await userModel.registerByEmail(email);
        if (result.affectedRows >= 1) {
          return response(res, 'Register Success!', null, null);
        } else {
          return res.status(500).send(res, 'Register Failed!', null, null);
        }
      } else {
        return res.status(400).send(res, 'Username or email already used!', null, null);
      }
    } else {
      return response(res, 'Your password must have 6 characters includes Uppercase, Lowercase, Number, and symbol', null, null, 400);
    }
  } else {
    return response(res, 'Your email format is wrong!', null, null, 400);
  }
};

// exports.verify = (req, res) => {
//   const auth = req.headers.authorization;
//   if (auth?.startsWith('Bearer')) {
//     const token = auth.split(' ')[1];
//     if (token) {
//       try {
//         if (jwt.verify(token, APP_SECRET)) {
//           return response(res, 'User verified!');
//         } else {
//           return response(res, 'User not verified!', null, null, 403);
//         }
//       } catch (err) {
//         return response(res, 'User not verified!', null, null, 403);
//       }
//     } else {
//       return response(res, 'Token must be provided!', null, null, 403);
//     }
//   }
// };

exports.forgotPassword = async (req, res) => {
  const { email, code, password, confirmPassword } = req.body;
  if (!code) {
    const user = await userModel.getEmailByEmail(email);
    if (user.length === 1) {
      const randomCode = Math.floor(Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1));
      const reset = await forgotRequestModel.createRequest(user[0].id, randomCode);
      if (reset.affectedRows >= 1) {
        const info = await mail.sendMail({
          from: APP_EMAIL,
          to: email,
          subject: 'Reset Password | Vehicle Rent',
          text: String(randomCode),
          html: `<b> This is ${randomCode} your code for reset your password! DO NOT GIVE THIS CODE TO OTHERS!</b>`
        });
        console.log(info.messageId);
        return response(res, 'Forgot Password request has been sent to your email!');
      } else {
        return response(res, 'Unexpected Error', null, null, 500);
      }
    } else {
      return response(res, 'If you registered, reset password code will sended to your email!');
    }
  } else {
    if (email) {
      const result = await forgotRequestModel.getRequest(code);
      if (result.length === 1) {
        if (result[0].isExpired) {
          return response(res, 'Expired code', null, null, 400);
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
                return response(res, 'Unexpected Error', null, null, 500);
              }
            } else {
              return response(res, 'Confirm password not same as password', null, null, 400);
            }
          } else {
            return response(res, 'Password is mandatory!', null, null, 400);
          }
        } else {
          console.log(user);
          return response(res, 'Invalid Email', null, null, 400);
        }
      } else {
        return response(res, 'Invalid code', null, null, 400);
      }
    } else {
      return response(res, 'You have to provide Confirmation Code', null, null, 400);
    }
  }
};