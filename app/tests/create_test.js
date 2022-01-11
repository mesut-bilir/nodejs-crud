
const assert = require('assert');
const db = require("../models");
const Customer = db.customers;

describe('Creating documents', () => {
    it('creates a pokemon', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const customer = new Customer({ 
            Firstname: "Mesut",
            Lastname: "Bilir",
            Gender: "Male",
            Street: "Gesun..",
            Postalcode: "123",
            City: "Berlin" 
        });
         
        customer.save() //takes some time and returns a promise
            .then(() => {
                assert(!customer.isNew); //if customer is saved to db it is not new
                done();
            });
    });
});