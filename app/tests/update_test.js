const assert = require('assert');
const db = require("../models");
const Customer = db.customers;

describe('Deleting a customer', () => {

  let mesut;

  beforeEach((done) => {
    mesut = new customer({ name: 'mesut' });
    mesut.save()
      .then(() => done());
  });
  
  function assertHelper(statement, done) {
    statement
     .then(() => Customer.find({}))
     .then((customers) => {
      assert(customers.length === 1);
      assert(customers[0].name === 'mesutcan');
      done();
    });
  }
  
  it('sets and saves customer using an instance', (done) => {
    mesut.set('name', 'mesutcan'); //not updated in mongodb yet
    assertHelper(mesut.save(), done);
   });
 
  it('update customer using instance', (done) => {
    //useful to update multiple fields of the object
    assertHelper(mesut.updateOne({ name: 'mesutcan' }), done);
  });

  it('update all matching customers using model', (done) => {
    assertHelper(Customer.updateOne({ name: 'mesut' }, { name: 'mesutcan' }), done);
  });

  it('update one customer using model', (done) => {
    assertHelper(Customer.findOneAndUpdate({ name: 'mesut' }, { name: 'mesutcan' }), done);
  });

  it('update one customer with id using model', (done) => {
    assertHelper(Customer.findByIdAndUpdate(mesut._id, { name: 'mesutcan' }), done);
  });
});