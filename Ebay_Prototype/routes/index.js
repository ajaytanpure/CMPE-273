var db_handler = require('./db_handler');
var myLogger = require('./logger');

var mongo = require('./mongo');
var objectId = require('mongodb').ObjectID;

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

	var params = {'email' : req.session.username};
	collection = mongo.db.collection("users");

	collection.findOne(params, function(err, result){
		console.lo
		if(result){
			res.send({'status':true, 'data':[result]});
		}else{
			res.send({'status':false});
		}
	})


}


// exports.getUserId = function(req,res){
// 	var params = {'email' : req.session.username};
	
// 	db_handler.getData("SELECT id FROM users where ? limit 1",params, function(result){
// 		try{
// 			console.log(result);
// 			if(result != []){
// 				res.send({'status' :true, 'data':result});
// 			}
// 			else{
// 				res.send({'status' : false})
// 			}
// 		}catch(err){
// 			console.log("Exception occurred while getting the categories");
// 			conso.log(err);
// 			res.send({'status' : false});
// 		}
// 	})	
// }; 



//=================================================================

exports.getUserDetails = function(req, res){
	var params = {'email':req.session.username};

	collection = mongo.db.collection("users");

	collection.findOne(params, function(err, result){
		if(result){
			res.send({'status':true, 'data':[result]});
		}else{
			res.send({'status':false});
		}
	})
}





// exports.getUserDetails = function(req, res){
// 	var params = {'email' : req.session.username};
	
// 	db_handler.getData("SELECT * FROM users where ?", params, function(result){
// 		try{
// 			console.log(result);
// 			if(result != []){
// 				res.send({'status' :true, 'data':result});
// 			}
// 			else{
// 				res.send({'status' : false})
// 			}
// 		}catch(err){
// 			console.log("Exception occurred while getting the categories");
// 			conso.log(err);
// 			res.send({'status' : false});
// 		}		
// 	});	
// };





exports.viewBuyHistory = function(req, res){

	collection = mongo.db.collection("user_buy");
	collectionProducts = mongo.db.collection("products");
	user_id = new objectId(req.body['user_id']);

	console.log(user_id);
	console.log('------');
	console.log(req.body['user_id']);

	collection.find({"user_id":user_id},{"_id":0, "user_id":0}).toArray(function(err, result){
		objectArray = [];
		for(product in result){
			console.log(result[product]['prod_id']);
			objectArray.push(new objectId(result[product]['prod_id']));
		}
		collectionProducts.find({"_id": {$in :objectArray}}).toArray(function(err, resultProduct){
			if(resultProduct){
				res.send({'status':true, 'data':resultProduct})
			}else{
				console.log('Error occurred while geting buy history')
				res.send({'status':false})
			}
		})
	})
}



// exports.viewBuyHistory = function(req, res){
// 	console.log(req.body);
// 	var params = {'ub.user_id' : req.body['user_id']};
// 	db_handler.getData("SELECT * FROM products p JOIN user_buy ub ON p.prod_id = ub.prod_id WHERE ?", params, function(result) {
// 		try{
// 			console.log(result);
// 			if(result != []){
// 				res.send({'status' :true, 'data':result});
// 			}
// 			else{
// 				res.send({'status' : false})
// 			}
// 		}catch(err){
// 			console.log("Exception occurred while getting the categories");
// 			conso.log(err);
// 			res.send({'status' : false});
// 		}
// 	});
// }



exports.viewSellHistory = function(req, res){

	collection = mongo.db.collection('products');
	var  user_id = new objectId(req.body['user_id']);

	collection.find({"user_id._id":user_id}).toArray(function(err, result){
		if(result){
			res.send({'status':true, 'data':result})
		}else{
			res.send({'status':false});
		}
	})
}


	
// exports.viewSellHistory = function(req, res){
// 	console.log(req.body);
// 	var params = {'user_id' : req.body['user_id']};
// 	db_handler.getData("SELECT * FROM products WHERE ?", params, function(result) {
// 		try{
// 			console.log(result);
// 			if(result != []){
// 				res.send({'status' :true, 'data':result});
// 			}
// 			else{
// 				res.send({'status' : false})
// 			}
// 		}catch(err){
// 			console.log("Exception occurred while getting the categories");
// 			conso.log(err);
// 			res.send({'status' : false});
// 		}
		
// 	});

// }



exports.updateMobile = function(req, res){

	collection = mongo.db.collection('users');

	collection.update({"email":req.body['email']},{$set:{"mobile" : req.body['mobile']}}, function(err, result){
		if(result['result']['ok'] ==  1){
			console.log('Updated mobile successfully');
			res.send({'status':true});
		}else{
			console.log('Error occurred while updating the mobile number');
			res.send({'status':false});
		}
	});
}



// exports.updateMobile = function(req, res){
// 	console.log(req.body);
// 	var params = [{'mobile':req.body['mobile']},{'email' : req.body['email']}];
// 	console.log(params);
	
// 	db_handler.getData("UPDATE users SET ? WHERE ?", params, function(result){
// 		try{
// 			res.send({'status' :true});
// 		}catch(err){
// 			console.log("Exception occurred while updating mobile");
// 			conso.log(err);
// 			res.send({'status' : false});
// 		}
// 	});
// }	


exports.updateBirthdate = function(req, res){

	collection = mongo.db.collection('users');

	collection.update({"email":req.body['email']}, {$set : {"birthdate" : req.body['birthdate']}}, function(err, result){
		if(result['result']['ok'] == 1){
			console.log('Updated birthdate successfully');
			res.send({'status':true});
		}else{
			console.log('Error occurred while updating the birthdate');
			res.send({'status':false});
		}
	} )
}


// exports.updateBirthdate = function(req, res){
// 	console.log(req.body);
// 	var params = [{'birthdate':req.body['birthdate']},{'email' : req.body['email']}];
// 	console.log(params);
	
// 	db_handler.getData("UPDATE users SET ? WHERE ?", params, function(result){
// 		try{
// 			res.send({'status' :true});
// 		}catch(err){
// 			console.log("Exception occurred while updating birthdate");
// 			conso.log(err);
// 			res.send({'status' : false});
// 		}
// 	});
// }




exports.updateLocation = function(req, res){

	collection = mongo.db.collection('users');
	collection.update({"email":req.body['email']}, {$set : {"location":req.body['location']}}, function(err, result){
		if(result['result']['ok'] == 1){
			console.log('updated location successfully');
			res.send({'status':true});
		}else{
			console.log('error occurred while updating the location of the user');
			res.send({'status':false});
		}
	});
}



// exports.updateLocation = function(req, res){
// 	console.log(req.body);
// 	var params = [{'location':req.body['location']},{'email' : req.body['email']}];
// 	console.log(params);
	
// 	db_handler.getData("UPDATE users SET ? WHERE ?", params, function(result){
// 		try{
// 			res.send({'status' :true});
// 		}catch(err){
// 			console.log("Exception occurred while updating location");
// 			conso.log(err);
// 			res.send({'status' : false});
// 		}
// 	});
// }




exports.updateLogin = function(req, res){

	collection = mongo.db.collection('users');
	console.log(req.body);
	collection.update({"email" : req.body['username']}, {$set : {"lastLogin" : (new Date()).toString()}}, function(err, result){
		console.log(err);
		if(result['result']['ok'] == 1){
			console.log('Updated last login time of the user');
			res.send({'status':true});
		}else{
			res.send({'status' : false});
		}
	});
}

// exports.updateLogin = function(req, res) {

// 	console.log('------------------ I came here for time');
// 	var params = {
// 		email : req.body['username']
// 	};
// 	db_handler.getData("UPDATE users set lastLogin = NOW() WHERE ?", params,
// 			function(result) {
// 				if (result != []) {
// 					try {
// 						console.log("Updated login time");
// 					} catch (e) {
// 						console.log("unexpected exception occurred" + e);
// 						res.send({
// 							'status' : 'fail'
// 						});
// 					}
// 				}
// 				res.send({
// 					'status' : 'fail'
// 				});
// 			})

// }




exports.bidIt = function(req, res){

	collection = mongo.db.collection('user_bid');
	collectionProducts = mongo.db.collection('products');
	collectionUser = mongo.db.collection('users');

	// Data from client :  {'user_id' : $scope.userId, 'prod_id':$scope.allInfo['prod_id'], 'price':bid.price}s

	var params = req.body;
	var prod_id = req.body['prod_id'];

	// This call insert users bid into the user_bid table
	collection.insert(params, function(err, result){
		if(result){
			collection.find({"prod_id" : prod_id}, {"prod_id" : 0}).toArray(function(err, resultOuter){	
				if(resultOuter){
					var maxPrice = 0;
					console.log(resultOuter);
					for(counter in  resultOuter){
						if(resultOuter[counter]['price'] > maxPrice){
							maxPrice = resultOuter[counter]['price'];
							bidding_user = resultOuter[counter]['user_id'];
						}
					}
					console.log("Max placed bid is : " + maxPrice);

					collectionUser.findOne({"_id":objectId(bidding_user)}, function(err, result1){

					console.log(result1);
							
					collectionProducts.update({"_id": new objectId(prod_id)}, 
						{$set : {"bidUserId" : result1, "highestBid":maxPrice}}, function(err, resultInner){
							if(resultInner){
								console.log('Bid placed successfully');
								res.send({'status':true});
							}
					} )


					})


				}
			})
		}
	})
}








// exports.bidIt = function(req, res){
// 	var params = req.body
// 	var outerParams = {'prod_id':params['prod_id']}
// 	db_handler.insertUserData("INSERT INTO user_bid SET ?", params, function(result){
// 		myLogger.logger.info("Bidding Added " + params);
// 		db_handler.insertUserData("select * from user_bid  where (prod_id,price) in (select prod_id,max(price) as maxpprice from user_bid  where ?);",
// 				outerParams, function(result) {
// 			var innerParams = [{'highestBid' : result[0]['price'],'bidUserId':result[0]['user_id']},{'prod_id':result[0]['prod_id']}]
// 			db_handler.insertUserData("UPDATE products SET ? WHERE ?", innerParams, function(res){
// 				myLogger.logger.info("Highest Bid till npe " + innerParams);
// 				myLogger.logger.info('Updated the product database with highest bid value');
// 			})
// 		})		
// 		res.send({'status': true});
// 	})
// }



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

	})





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








