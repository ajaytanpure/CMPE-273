
var db_handler = require('./db_handler');
var mongo = require('./mongo');
var objectId = require('mongodb').ObjectID;
var mqClient = require('../rpc/client');


exports.loadCategory = function(req, res){
	var msgPayload = {};
	mqClient.make_request('loadCategory_queue', msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.insertProduct = function(req, res){

	var msgPayload = req.body

	mqClient.make_request("insertProduct_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}
