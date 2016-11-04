var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/testEbay";
var objectId = require('mongodb').ObjectID;


exports.getUserId = function(msg, callback){

	var res = {};

	mongo.connect(mongoURL, function(){
		collection = mongo.collection('users');
		collection.findOne(msg, function(err, result){
			if(err){
				throw err;
			}
			if(result){
				res.status = true;
				res.data = [result];
			}else{
				result.status = false;
			}
			callback(null, res);
		});
	});
}


exports.getUserDetails = function(msg, callback){

	var res = {};

	mongo.connect(mongoURL, function(){
		collection = mongo.collection('users');
		collection.findOne(msg, function(err, result){
			if(err){
				throw err;
			}
			if(result){
				res.status = true;
				res.data = [result];
			}else{
				res.status = false;
			}
			callback(null, res);
		});
	});
}


exports.viewBuyHistory = function(msg, callback){

	var res = {};

	mongo.connect(mongoURL,function(){
		collection = mongo.collection("user_buy");
		collectionProducts = mongo.collection("products");
		user_id = new objectId(msg['user_id']);

		collection.find({"user_id":user_id},{"_id":0, "user_id":0}).toArray(function(err, result){
			objectArray = [];
			for(product in result){
				console.log(result[product]['prod_id']);
				objectArray.push(new objectId(result[product]['prod_id']));
			}
			collectionProducts.find({"_id": {$in :objectArray}}).toArray(function(err, resultProduct){
				if(resultProduct){
					res.status = true;
					res.data = resultProduct
				}else{
					console.log('Error occurred while geting buy history')
					res.status = false;
				}
				callback(null, res);
			});
		});
	});
}


exports.viewSellHistory = function(msg, callback){

	mongo.connect(mongoURL, function(){
		collection = mongo.collection('products');

		var  user_id = new objectId(req.body['user_id']);

		collection.find({"user_id._id":user_id}).toArray(function(err, result){
			if(err){
				throw err;
			}
			if(result){
				res.status = true;
				res.data = result;
			}else{
				res.status = false;
			}
			callback(null, res);
		});
	});
}


exports.updateMobile = function(msg, callback){

	mongo.connect(mongoURL, function(){
		collection = mongo.collection('users');
		collection.update({"email":msg.email},{$set:{"mobile" : msg.mobile}}, function(err, result){
			if(result['result']['ok'] ==  1){
				console.log('Updated mobile successfully');
				res.status = true;
			}else{
				console.log('Error occurred while updating the mobile number');
				res.status = false;
			}
			callback(null, res);
		});
	});
}


exports.updateBirthdate = function(msg, callback){

	mongo.connect(mongoURL, function(){
		collection = mongo.collection('users');
		collection.update({"email":msg.email}, {$set : {"birthdate" : msg.birthdate}}, function(err, result){
			if(result['result']['ok'] == 1){
				console.log('Updated birthdate successfully');
				res.status = true;
			}else{
				console.log('Error occurred while updating the birthdate');
				res.status = false;
			}
			callback(null, res);
		});
	});
}


exports.updateLocation = function(msg, callback){

	mongoURL.connect(mongoURL, function(){
		collection = mongo.collection('users');
		collection.update({"email":msg.email}, {$set : {"location":msg.location}}, function(err, result){
			if(result['result']['ok'] == 1){
				console.log('updated location successfully');
				res.status = true;
			}else{
				console.log('error occurred while updating the location of the user');
				res.status = false;
			}
			callback(null, res);
		});
	});	
}

exports.updateLogin = function(msg, callback){


	mongo.connect(mongoURL, function(){
		collection = mongo.collection('users');
		console.log(req.body);
		collection.update({"email" : msg.email}, {$set : {"lastLogin" : (new Date()).toString()}}, function(err, result){
			if(err){
				throw err;
			}
			if(result['result']['ok'] == 1){
				console.log('Updated last login time of the user');
				res.status = true;
			}else{
				res.status = false
			}
			callback(null, res);
		});
	});
}


exports.bidIt =function(msg, callback){

	mongo.connect(mongoURL, function(){

		collection = mongo.collection('user_bid');
		collectionProducts = mongo.collection('products');
		collectionUser = mongo.collection('users');

	// Data from client :  {'user_id' : $scope.userId, 'prod_id':$scope.allInfo['prod_id'], 'price':bid.price}s

	var params = msg;
	var prod_id = msg['prod_id'];

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
									res.status = true;
									callback(null, res);
								}
							});
					});
				}
			});
		}
	});
});

}

