var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/test";


exports.signin = function(req, res){
	var username = req.body['username'];
	var password = req.body['password'];
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('newCollection');

		coll.findOne({username:username, password :password}, function(err, user){
			if (user) {
				req.session.username = user.username;
				console.log(user);
				res.send({'status':true, 'data':user});
			} else {
				console.log("returned false");
				res.send({'status':false})
			}
		});		
	});
}