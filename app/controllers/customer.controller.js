const db = require("../models");
const Customer = db.customers;
const CustomError = require('../models/CustomError')
const { validationResult } = require('express-validator')

// Create and Save a new Customer
exports.create = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }
  if (!req.body) {
    return next(new CustomError('Body cannot be empty', 400))
  }
  try {
    const customer = new Customer({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      street: req.body.street,
      postalcode: req.body.postalcode,
      city: req.body.city
    });
    await customer.save()
    res.status(201).json({ success: true, customer })

  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
}

// Update a Customer by the id in the request
exports.update = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }

  if (!req.body) {
    return next(new CustomError('Body cannot be empty', 400))
  }
  try {
    const editCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
    if (!editCustomer) {
      return next(new CustomError('Customer not found', 404))
    }
    return res.status(200).send({ success: true, customer: editCustomer })
  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
}

// Get all Customers from the database.
exports.findAll = async (req, res, next) => {
  try {
    const cust = await Customer.find()
    return res.status(200).send({ success: true, customer: cust })
  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
}

// Find search Customers with an key
exports.findSearch = async (req, res, next) => {
  var key = req.params.key;
  try {
    const cust = await Customer.find({ lastname: { $regex: new RegExp(key), $options: "i" } })
    return res.status(200).send({ success: true, customer: cust })
  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
}

// Delete a Customer with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return next(new CustomError('Customer not found', 404))
    }
    await Customer.findByIdAndDelete(req.params.id)
    return res.send({ success: true, customer })
  } catch (err) {
    console.log(err)
    next(new CustomError('Something went wrong', 500))
  }
};
