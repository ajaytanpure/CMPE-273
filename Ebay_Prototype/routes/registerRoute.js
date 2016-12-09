var db_handler = require('./db_handler');
var crypto = require('crypto');


var soap = require('soap');
var baseURL = "http://localhost:8080/SOAPEbay/services";

var option = {
	ignoredNamespaces : true	
};

var url = baseURL+"/Register?wsdl";


exports.register = function(req, res) {
	

	var cipher = crypto.createCipher("aes-256-ctr", "test");
	var pass = cipher.update(req.body['password'], 'utf8','hex');
	pass = pass + cipher.final('hex');
	
	var params = {
		email : req.body['username'],
		firstName : req.body['firstname'],
		lastName : req.body['lastname'],
		mobile : req.body['mobile'],
		password : pass
	};
	console.log(params);

	soap.createClient(url,option, function(err, client) {
		console.log(err)
		client.registerUser(params, function(err, result1) {
			if(err){
				res.send({
					'status' : 'fail'
				});
			}
		});
	});
};