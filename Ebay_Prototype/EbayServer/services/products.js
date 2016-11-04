var mongo = require('./mongo');
var objectId = require('mongodb').ObjectID;
var mongoURL = "mongodb://localhost:27017/testEbay";


var fs = require('fs');

fs.writeFile("logs/events.log", "Event logs", function(err) {
	console.log("Error while writing file initially");
});

exports.getProducts = function(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
		collection = mongo.collection("products");
		collection.find().toArray(function(err, result){
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


 exports.getProduct = function(msg, callback){

	var params = msg;
	var res = {};
	mongo.connect(mongoURL, function(){
		collection = mongo.collection("products");
		prod_id = new objectId(params['prod_id']);
		collection.findOne({"_id":prod_id}, function(err, result){
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


// Here check the carts in client only
exports.updateUserBuy = function(msg, callback){

	var res = {};
	mongo.connect(mongoURL, function(){
		collectionUserBuy = mongo.collection('user_buy');
		collectionProducts = mongo.collection('products');

		var data = msg.pair;
		var product = {'prod_id':null}
		for(var counter in data){
			console.log(data[counter]);
			user_id = new objectId(data[counter]['user_id']);
			prod_id = new objectId(data[counter]['prod_id']);

			collectionUserBuy.insert({'user_id':user_id, 'prod_id':prod_id}, function(err, result){
				if(result){
					collectionProducts.update({'_id':prod_id},{$inc:{"quantity" : -1, "quantitySold" : 1}}, function(err, resultUpdate){
						res.status = true;
					})

				}else{
					res.status = false;
				}
				callback(null, res);
			});
		}
	});
}
