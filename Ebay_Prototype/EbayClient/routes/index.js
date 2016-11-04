var db_handler = require('./db_handler');
var myLogger = require('./logger');
var mongo = require('./mongo');
var objectId = require('mongodb').ObjectID;
var mqClient = require('../rpc/client');

myLogger.logger.info("This simple log written by another file");


exports.index = function(req, res) {
	res.render('index', {
		title : 'Express'
	});
};

exports.sessionActive = function(req, res) {
	if (req.session.username) {
		res.send({
			'active' : true,
			'user' : req.session.username
		})
	} else {
		res.send({
			'active' : false
		})
	}
};

exports.sessionKill = function(req, res) {
	req.session.destroy();
	res.send({
		'status' : true
	});
};


//==============================


exports.getUserId = function(req, res){

	var msgPayload = {'email' : req.session.username};
	
	mqClient.make_request("getUserId_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.getUserDetails = function(req, res){
	
	var msgPayload = {'email':req.session.username};

	mqClient.make_request("getUserDetails_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.viewBuyHistory = function(req, res){

	var msgPayload = req.body;

	mqClient.make_request("viewBuyHistory_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.viewSellHistory = function(req, res){

	var msgPayload = req.body;
	mqClient.make_request("viewSellHistory_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.updateMobile = function(req, res){

	var msgPayload = req.body;

	mqClient.make_request("updateMobile", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result)
		}
	});
}


exports.updateBirthdate = function(req, res){


	var msgPayload = req.body;
	mqClient.make_request("updateBirthdate_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.updateLocation = function(req, res){

	var msgPayload = req.body;
	mqClient.make_request("updateLocation_queue", msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


exports.updateLogin = function(req, res){


	var msgPayload = req.body;
	mqClient.make_request("updateLogin_queue", msgPayload, function(err, result){
		if(err){
			throw err
		}else{
			res.send(result);
		}
	});
}


exports.bidIt = function(req, res){

	var msgPayload = req.body;

	mqClient.make_request("bidIt_queue", msgPayload,function(err, result){
		if(err){
			throw err;
		}else{
			res.send(result);
		}
	});
}


setInterval(function(){

	console.log('Bidding service started');

	collectionProducts = mongo.db.collection('products');
	collectionuser_buy = mongo.db.collection('user_buy');
	collectionUser_bid = mongo.db.collection('user_bid');

	var date = new Date()
	date = date.setDate(date.getDate() - 4);

	collectionProducts.find({"timeAdded" : {$gt : (date)}}).toArray(function(err, result){
		if(result){
			for(var counter in result){
				user_id = result[couter]["bidUserId._id"]
				prod_id = result[couter]["_id"];
				collectionuser_buy.insert({"user_id":user_id, "prod_id":prod_id}, function(err, result1){
					if(result1){
						collectionProducts.update({"_id":prod_id}, {$set:{"quantity" : 0, "quantitySold":result[counter]['quantity']}});
					}
				});
			}
		}

	});
},6000)







// setInterval(function(){
// 	db_handler.getData("select * from products where timeAdded <= (DATE_SUB(NOW(), INTERVAL 4 DAY)) and quantity > 0 and highestBid > 0 limit 1", {}, function(result) {
// 		if(result.length < 0){
// 			console.log("Ola ola ola");
// 			myLogger.logger.info("No valid bidding avaiable yet or bidding is still in process");
// 		}
		
// 		for(var counter in result){
// 			console.log("Hey!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + counter);
// 			var dataParams = {'prod_id' : result[counter]['prod_id'], 'user_id' : result[counter]['bidUserId']}
// 			var prodQuantity = result[counter]['quantity'];
// 			var deleteParams = {'prod_id' : result[counter]['prod_id']};
// 			var updateQuant = [{'quantity' : 0, 'quantitySold': result[counter]['quantity']},{'prod_id' : result[counter]['prod_id']}];
// 			myLogger.logger.info("Closing bid for product " + dataParams['prod_id']);
// 			db_handler.insertUserData("INSERT INTO user_buy set ? ", dataParams, function(resultOutere){
// 				myLogger.logger.info("Product " + dataParams['prod_id'] + "Added to user cart User Id : " + dataParams['user_id']);
// 				for(var innerCounter = 0; innerCounter < prodQuantity -1; innerCounter++){
// 					db_handler.insertUserData("INSERT INTO user_buy set ? ", dataParams, function(output){
// 						//Nothing to here;
// 					});
// 				}
// 				db_handler.insertUserData("UPDATE products SET ? WHERE ?", updateQuant, function(resultInner){
// 					myLogger.logger.info('Bidding has been completed');
// 					db_handler.insertUserData("DELETE FROM user_bid WHERE ?", deleteParams, function(res){
// 					});
// 				});
// 			});	
// 		}
// 	});
// },30000);








