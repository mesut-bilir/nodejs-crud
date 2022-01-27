
module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  const auth = require('../middlewares/auth');
  const { check } = require('express-validator')

  // Create a new Customer
  router.post("/", auth,
  [
    check('firstname', 'Please fill out firstname').trim().notEmpty(),
    check('lastname', 'Please fill out lastname').trim().notEmpty(),
    check('gender', 'Please fill out gender').trim().notEmpty(),
    check('street', 'Please fill out street').trim().notEmpty(),
    check('postalcode', 'Please fill out postalcode').trim().notEmpty(),
    check('city', 'Please fill out city').trim().notEmpty(),
  ],
  customers.create);

  // Update a Customer with id
  router.put("/:id", auth, 
  [
    check('firstname', 'Please fill out firstname').trim().notEmpty(),
    check('lastname', 'Please fill out lastname').trim().notEmpty(),
    check('gender', 'Please fill out gender').trim().notEmpty(),
    check('street', 'Please fill out street').trim().notEmpty(),
    check('postalcode', 'Please fill out postalcode').trim().notEmpty(),
    check('city', 'Please fill out city').trim().notEmpty(),
  ],
   customers.update);

  // Get all customers with auth
  router.get("/", auth, customers.findAll);

  // findSearch by lastname
  router.get("/search/:key", auth, customers.findSearch);

  // Delete a Customer with id
  router.delete("/:id", auth, customers.delete);

  app.use("/api/customers", router);
};

