const express = require('express');

const usersController = require('../controllers/users');
const authentication = require('../middleware/authentication');

const router = express.Router();

router.get('/users', authentication.isAuthourized, usersController.getUsers);

router.post(
  '/user',
  usersController.createUser,
);

module.exports = router;
