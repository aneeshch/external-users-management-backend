const helpers = require('../utils/helpers');
const mappers = require('../utils/mappers');
const constants = require('../utils/constant');
const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  try {
    User.find()
      .then((users) => {
        res.status(200).json({
          message: constants.FETCH_USERS_SUCCESS_MESSAGE,
          users: mappers.usersList(users),
        });
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const {
      firstName, lastName, address, ssn, telephoneNo,
    } = req.body;
    const hashedSsn = helpers.encrypt(ssn);
    const user = new User({
      firstName,
      lastName,
      address,
      ssn: hashedSsn,
      telephoneNo,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: constants.CREATE_USER_SUCCESS_MESSAGE,
        });
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
