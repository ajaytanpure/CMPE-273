var assert = require('assert');
var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("localhost:3000");

describe('Basic', function() {

	it("SignInTest", function(done) {
		server.post('/signin').send({
			'username' : 'ajaytanpure92@gmail.com',
			'password' : 'ajay'
		}).expect(200).end(function(err, res) {
			res.status.should.equal(200);
			res.body['status'].should.equal('success');
			done();
		});
	});

	it("registerTest", function(done) {
		server.post('/register').send({
			'username' : 'test@test.com',
			'password' : 'ajay',
			'firstname' : 'test',
			'lastname' : 'test',
			'mobile' : '1234123412'
		}).expect(200).end(function(err, res) {
			res.status.should.equal(200);
			res.body['status'].should.equal(true);
			done();
		});
	});

	it("sessionActiveTest", function(done) {
		server.post('/sessionActive').send({
			'username' : 'ajaytanpure92@gmail.com',
			'password' : 'ajay'
		}).expect(200).end(function(err, res) {
			res.status.should.equal(200);
			res.body['active'].should.equal(true);
			done();
		});
	});

	it("getUserIdTest", function(done) {
		server.post('/getUserId').send({}).expect(200).end(function(err, res) {
			res.status.should.equal(200);
			res.body['status'].should.equal(true);
			done();
		});
	});

	it("getUserDetails", function(done) {
		server.post('/getUserDetails').send({}).expect(200).end(
				function(err, res) {
					res.status.should.equal(200);
					res.body['status'].should.equal(true);
					res.body['data'][0]['firstName'].should.equal('Ajay');
					res.body['data'][0]['lastName'].should.equal('Tanpure');
					res.body['data'][0]['email'].should
							.equal('ajaytanpure92@gmail.com');
					done();
				});
	});

	it("sessionKill", function(done) {
		server.post('/sessionKill').send({}).expect(200).end(
				function(err, res) {
					res.status.should.equal(200);
					res.body['status'].should.equal(true);
					done();
				});
	});

})