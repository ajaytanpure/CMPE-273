var db_handler = require('./db_handler');
var crypto = require('crypto');

var mongo = require('./mongo');


exports.register = function(req, res){

	var cipher = crypto.createCipher("aes-256-ctr", "test");
	var pass = cipher.update(req.body['password'], 'utf8', 'hex');
	pass = pass + cipher.final('hex');

	var params = {
		email : req.body['username'],
		firstName : req.body['firstname'],
		lastName : req.body['lastname'],
		mobile : req.body['mobile'],
		password : pass
	};

	collection = mongo.db.collection("users");
	collection.insert(params, function(err, result){
		if(result){
			if(result['result']['ok'] == 1){
				res.send({'status':true});
			}
		}else{
			res.send({'status':false});
		}
	})
}








// exports.register = function(req, res) {
	
		
// 	var cipher = crypto.createCipher("aes-256-ctr", "test");
// 	var pass = cipher.update(req.body['password'], 'utf8','hex');
// 	pass = pass + cipher.final('hex');
	
// 	var params = {
// 		email : req.body['username'],
// 		password : req.body['password'],
// 		firstName : req.body['firstname'],
// 		lastName : req.body['lastname'],
// 		mobile : req.body['mobile'],
// 		password : pass
// 	};
// 	console.log(params);
// 	db_handler.getData("INSERT INTO users SET ?", params, function(result) {
// 		if (result) {
// 			console.log("user created successfully");
// 			res.send({'status':true});
// 		}
// 	})
// };



