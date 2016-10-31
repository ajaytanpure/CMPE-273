var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/test";

var mqClient = require('../rpc/client');

exports.signin = function(req, res){

	var username = req.body['username'];
	var password = req.body['password'];

	var msgPayload = {"username":username, "password":password};
	console.log('In the client signin request  :' + msgPayload);

	mqClient.make_request('login_queue', msgPayload, function(err, result){

		if(err){
			throw err;
		}
		else{
			if(result){
				if(result['status'] == true){
					req.session.username = result['data']['username'];
					res.send(result);
				}
			}
		}
	});
}