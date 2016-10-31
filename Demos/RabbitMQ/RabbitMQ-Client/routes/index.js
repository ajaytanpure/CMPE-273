var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/test";

exports.index = function(req, res) {
	res.render('index', {
		title : 'Express'
	});
};

exports.logout = function(req, res){
	req.session.destroy();
	res.send({
		'status' : true
	});
};

exports.sessionActive = function(req, res){
	if(req.session.username){
		console.log("Checking if session is active");
		res.send({'status':true, 'username':req.session.username});
	}
	else{
		res.send({'status':'false'});
	}
};

exports.getDetails = function(req, res){
	var username = req.body['username'];
	console.log(req.body);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('newCollection');

		coll.findOne({username:username}, function(err, user){
			if (user) {
				console.log(user);
				res.send({'status':true, 'data':user});
			} else {
				console.log("returned false");
				res.send({'status':false})
			}
		});		
	});

}