var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/test";


function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	


	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at : ' + mongoURL);

		coll = mongo.collection('newCollection');
		
		coll.insertOne(msg, function(err, user){
			if(user){
				console.log(user);
				res.status = true;
				res.data = user;
			}else{
				res.status = false;
			}
			callback(null, res);
		});
	});
}

exports.handle_request = handle_request;



// exports.register = function(req, res){
// 	var username = req.body['username'];
// 	var password = req.body['password'];
// 	var firstname = req.body['firstname'];
// 	var lastname = req.body['lastname'];
// 	var mobile = req.body['mobile'];
	
// 	mongo.connect(mongoURL, function(){
// 		console.log('Connected to mongo at: ' + mongoURL);
// 		var coll = mongo.collection('newCollection');

// 		coll.insertOne({username:username, password :password, firstName:firstname,lastName:lastname, mobile:mobile }, function(err, user){
// 			if (user) {
// 				console.log(user);
// 				res.send({'status':true});
// 			} else {
// 				console.log("returned false");
// 				res.send({'status':false})
// 			}
// 		});		
// 	});
// }