module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  const { check } = require('express-validator')

  router.post(
    '/register',
    [
      check('username', 'Please enter a valid username').trim().notEmpty(),
      check('email', 'Please enter a valid email').trim().isEmail(),
      check('password', 'Please enter a valid password (min 6 characters)').trim().isLength({ min: 6 }),
    ],
    users.register
  )

  router.post(
    '/login',
    [
      check('email', 'Please enter a valid email').trim().isEmail(),
      check('password', 'Please enter a valid password').trim().isLength({ min: 6 }),
    ],
    users.login
  )

  app.use("/api/users", router);
};

