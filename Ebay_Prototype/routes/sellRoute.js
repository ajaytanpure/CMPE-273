var db_handler = require('./db_handler');


var soap = require('soap');
var baseURL = "http://localhost:8080/SOAPEbay/services";

var option = {
	ignoredNamespaces : true	
};

var url = baseURL+"/Seller?wsdl";



exports.loadCategory = function(req, res) {

	var params = {};

	soap.createClient(url,option, function(err, client) {
		console.log(err)
		client.loadCategory(params, function(err, result1) {
			if(!err){
				res.send({
					'status' : true,
					'data' : result
				});
			}else{
				res.send({
					'status' : false
				});
			}
		});
	});
};

exports.insertProduct = function(req, res) {
	var params = req.body;
	
		soap.createClient(url,option, function(err, client) {
		console.log(err)
		client.insertProduct(params, function(err, result1) {
			if(!err){
				res.send({
					'status' : true,
					'data' : result
				});
			}else{
				res.send({
					'status' : false
				});
			}
		});
	});
};
