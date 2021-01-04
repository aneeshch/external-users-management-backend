const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const Admin = require('../models/admin');
const constants = require('../utils/constant');

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const { username, password } = req.body;
    Admin.findOne({ email: username }).then(async (admin) => {
      if (!admin) {
        res.status(400).json({
          message: constants.ADMIN_DOES_NOT_EXIST_MESSAGE,
        });
      } else {
        const flag = await bcrypt.compare(password, admin.password);
        if (flag) {
          const token = jwt.sign({ name: admin.name, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

          res.status(200).json({
            message: constants.LOGIN_SUCCESS_MESSAGE,
            jwt: token,
          });
        } else {
          res.status(400).json({
            message: constants.PASSWORD_WRONG_MESSAGE,
          });
        }
      }
    });
  } catch (err) {
    next(err);
  }
};
