var db_handler = require('./db_handler');
var crypto = require('crypto');
var myLogger = require('./logger');

var soap = require('soap');
var baseURL = "http://localhost:8080/SOAPEbay/services";

var option = {
	ignoredNamespaces : true	
};

var url = baseURL+"/Signin?wsdl";

exports.signin = function(req, res) {

	var cipher = crypto.createCipher("aes-256-ctr", "test");
	var pass = cipher.update(req.body['password'], 'utf8','hex');
	pass = pass + cipher.final('hex');

	console.log("I am here buddy");
	console.log(pass);
	console.log(req.body['password']);
	var params = {
		email : req.body['username'],
		password : pass
	};

	soap.createClient(url,option, function(err, client) {
		console.log(err)
		client.signInUser(params, function(err, result1) {
			console.log(result1.signInUserReturn);
			if(result1.signInUserReturn == true){
				console.log("Login successful");
				req.session.username = req.body['username'];
				response = {'status' : 'success'} ;
				res.send(response);
			}else{
				res.send({
						'status' : 'fail'
				})
			}
		});
	});
};



exports.updateLogin = function(req, res){
	
	console.log('------------------ I came here for time');
	var params = {
		email : req.body['username'],
	};


	soap.createClient(url,option, function(err, client) {
		console.log(err)
		client.updateLastLogin(params, function(err, result1) {
			console.log(result1.signInUserReturn);
			if(err){
				res.send({
					'status' : 'fail'
				});
			}
		});
	});
	
}



