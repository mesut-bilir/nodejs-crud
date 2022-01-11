const db = require("../models");
const Customer = db.customers;


// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.Firstname) {
    res.status(400).send({ message: "Content can not be empty test!" });
    return;
  }

  // Create a Customer
  const customer = new Customer({
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Gender: req.body.Gender,
    Street: req.body.Street,
    Postalcode: req.body.Postalcode,
    City: req.body.City
  });

  // Save Customer in the database
  customer
    .save(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

// Get all Customers from the database.
exports.findAll = (req, res) => {
  const id = req.params.id;
   console.log(id);
  const Lastname = req.query.Lastname;
  var condition = Lastname ? { Lastname: { $regex: new RegExp(Lastname), $options: "i" } } : {};
console.log("tumu");
  Customer.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};
// Find search Customers with an key
exports.findSearch = (req, res) => {
  var key = req.params.id;
  //for serach 
  Customer.find({ Lastname: { $regex: new RegExp(key), $options: "i" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    });

};
// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("tek");
  Customer.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Customer with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Customer with id=" + id });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
        });
      } else res.send({ message: "Customer was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
        });
      } else {
        res.send({
          message: "Customer was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id
      });
    });
};


