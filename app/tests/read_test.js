const assert = require('assert');
const db = require("../models");
const Customer = db.customers;

let mesut;

beforeEach((done) => {
    mesut = new Customer({  name: 'mesut' });
    mesut.save()
        .then(() => done());
});

describe('Reading Customer details', () => {
    it('finds Customer with the name of mesut', (done) => {
        Customer.findOne({ name: 'mesut' })
            .then((customer) => {
                assert(mesut.name === 'mesut'); 
                done();
            });
    })
})