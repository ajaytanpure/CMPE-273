
var db_handler = require('./db_handler');

var mongo = require('./mongo');
var objectId = require('mongodb').ObjectID;


exports.loadCategory = function(req, res){

	collection = mongo.db.collection("category");
	collection.find({}).toArray( function(err, result){
		if(result){
			res.send({'status':true,'data':result});
		}else{
			res.send({'status':false});
		}
	});
}




// exports.loadCategory = function(req, res) {
// 	db_handler.getData("SELECT * FROM category", {}, function(result) {
// 		try {
// 			if (result != []) {
// 				res.send({
// 					'status' : true,
// 					'data' : result
// 				});
// 			} else {
// 				res.send({
// 					'status' : false
// 				})
// 			}
// 		} catch (err) {
// 			console.log("Exception occurred while getting the categories");
// 			conso.log(err);
// 			res.send({
// 				'status' : false
// 			});
// 		}

// 	})
// };


exports.insertProduct = function(req, res){
	var params = req.body;
	console.log(params);

	user_id = new objectId(params['user_id']);

	collectionUsers = mongo.db.collection('users');
	collectionProducts = mongo.db.collection("products");

	delete params['user_id'];
	collectionUsers.findOne({'_id':user_id}, function(err, result){		
		params['user_id'] = result;
		params['timeAdded'] = (new Date()).toString();
		collectionProducts.insert(params, function(err, resultInsert){
			console.log(resultInsert);
			if(resultInsert['result']['ok'] ==  1){
				res.send({'status':true})
			}
			else{
				console.log(err);
				res.send({'status':false});
			}
		})
	});
}


// exports.insertProduct = function(req, res) {
// 	var params = req.body;
// 	db_handler.getData("INSERT INTO products SET ?", params, function(result) {
// 		try {
// 			if (result != []) {
// 				console.log("Product added")
// 				res.send({
// 					'status' : true
// 				})
// 			} else {
// 				res.send({
// 					'status' : false
// 				})
// 			}
// 		} catch (err) {
// 			res.send({
// 				'status' : false
// 			})
// 		}
// 	})
// };
