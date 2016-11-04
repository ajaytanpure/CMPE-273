var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/testEbay";


exports.registerUser = function(msg, callback){
	var res = {};
	console.log('Connected to mongo at : ' + mongoURL);


	mongo.connect(mongoURL, function(){
		coll = mongo.collection('newCollection');

		coll.insertOne(msg, function(err, user){
			if(user){
				console.log('I came here');
				console.log(user);
				res.status = true;
			}else{
				res.status = false;
			}
			callback(null, res);
		});
	})
}

