'use strict';
process.env.NODE_ENV = "test";

var fetch = require("node-fetch");
var chai = require("chai");
var should = chai.should();

var fetchTimeout = require('../src');

describe("fetchTimeout should receive a 200 status'd response, and an object containing at least the property authorizations_url, which is a string", function() {
	it("it should have a 'message' property whose type is string", function(done) {

        fetchTimeout('https://api.github.com/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }, 5000, 'Errore nel timeout')
        .then(function(res) {
        	res.status.should.equal(200);
        	return res.json();
        })
        .then(function(json) {
        	json.should.be.a("object");
        	json.should.have.property("authorizations_url");
        	json.authorizations_url.should.be.a("string");
            done();
        })
        .catch(function(err) {
            console.log("error", err);
        });

	});
});
