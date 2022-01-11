const assert = require('assert');
const db = require("../models");
const Customer = db.customers;

describe('Deleting a Customer', () => {

  let mesut;

  beforeEach((done) => {
    mesut = new Customer({ name: 'mesut' });
    mesut.save()
      .then(() => done());
  });

  it('removes a Customer using its instance', (done) => {
    mesut.remove()
      .then(() => Customer.findOne({ name: 'mesut' }))
      .then((Customer) => {
        assert(Customer === null);
        done();
      });
  });

  it('removes multiple Customers', (done) => {
    Customer.deleteOne({ name: 'mesut' })
      .then(() => Customer.findOne({ name: 'mesut' }))
      .then((Customer) => {
        assert(Customer === null);
        done();
      });
  });

  it('removes a Customer', (done) => {
    Customer.findOneAndRemove({ name: 'mesut' })
      .then(() => Customer.findOne({ name: 'mesut' }))
      .then((Customer) => {
        assert(Customer === null);
        done();
      });
  });

  it('removes a Customer using id', (done) => {
    Customer.findByIdAndRemove(mesut._id)
    // the following code block is repeated again and again
      .then(() => Customer.findOne({ name: 'mesut' }))
      .then((Customer) => {
        assert(Customer === null);
        done();
      });
    // block end
  })
})