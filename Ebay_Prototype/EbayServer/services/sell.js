var mongo = require('./mongo');
var objectId = require('mongodb').ObjectID;
var mongoURL = "mongodb://localhost:27017/testEbay";

exports.loadCategory = function(msg, callback){

	var res = {};

	mongoURL.connect(mongoURL, function(){
		collection = mongo.collection("category");
		collection.find({}).toArray( function(err, result){
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


exports.insertProduct = function(msg, callback){

	var params = msg;
	var res = {};

	user_id = new objectId(params['user_id']);

	mongo.connect(mongoURL, function(){
		collectionUsers = mongo.collection('users');
		collectionProducts = mongo.collection("products");

		delete params['user_id'];
		collectionUsers.findOne({'_id':user_id}, function(err, result){		
			params['user_id'] = result;
			params['timeAdded'] = (new Date()).toString();
			collectionProducts.insert(params, function(err, resultInsert){
				console.log(resultInsert);
				if(resultInsert['result']['ok'] ==  1){
					res.status = true;
				}
				else{
					res.status = false;
				}
				callback(null, res);
			});
		});		
	});
}
