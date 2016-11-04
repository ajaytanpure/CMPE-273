var db_handler = require('./db_handler');
var mongo = require('./mongo');
var objectId = require('mongodb').ObjectID;
var fs = require('fs');
var mqClient = require('../rpc/client');


fs.writeFile("logs/events.log", "Event logs", function(err) {
	console.log("Error while writing file initially");
});


//============================

exports.getProducts = function(req, res){


	msgPayload = {};
	mqClient.make_request("getProducts_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}	});
}


exports.getProduct = function(req, res){

	var msgPayload = req.body;
	
	mqClient.make_request("getProduct_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.updateUserBuy = function(req, res){

	var msgPayload = req.body;

	mqClient.make_request("updateUserBuy_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
			req.session.usercart = null;
		}
	});
}


//This function remains here only.
exports.addToCart = function(req, res){
	var data = req.body;
	console.log('one : ');
	console.log(req.session.usercart);
	console.log('two : ');
	console.log(req.body);
	req.session.usercart = req.body;
	
	res.send({'status':true});	
}


//This function also stays here 
exports.getCart = function(req, res){
	console.log("I am returning the cart");
	var data = req.session.usercart;
	if(data){
		//console.log(data);
		res.send({'status' : true, 'data' : data})
	}
	else{
		res.send({'status':false});
	}
}


// This function also stays here only
exports.mapEvents = function(req, res){
	var userId = req.session.username;
	var message = "\nUser : " + userId +" has clicked on "+req.body['prod_id']+ " : " + req.body['name'];
	console.log(message);
	fs.appendFile("logs/events.log", message, function(err){
		console.log("Error while writing the event log");
	})

}



