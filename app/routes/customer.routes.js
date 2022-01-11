module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post("/", customers.create);

  // Get all customers
  router.get("/", customers.findAll);

  // findSearch by lastname
  router.get("/key/:id", customers.findSearch);

  // Get a single Customer with id
  router.get("/:id", customers.findOne);

  // Update a Customer with id
  router.put("/:id", customers.update);

  // Delete a Customer with id
  router.delete("/:id", customers.delete);


  app.use("/api/customers", router);
};
