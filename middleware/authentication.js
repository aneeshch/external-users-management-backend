const jwt = require('jsonwebtoken');
const constants = require('../utils/constant');

exports.isAuthourized = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({
      message: constants.NOT_AUTHORIZED_MESSAGE,
      err,
    });
  }
};
