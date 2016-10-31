var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/test";

var mqClient = require('../rpc/client');


exports.register =function(req, res){
	var username = req.body['username'];
	var password = req.body['password'];
	var firstname = req.body['firstname'];
	var lastname = req.body['lastname'];
	var mobile = req.body['mobile'];

	var msgPayload = {'username':username, 'password':password, 'firstName':firstname, 'lastName':lastname, 'mobile':mobile};

	console.log('In the client register request');

	mqClient.make_request('register_queue', msgPayload, function(err, result){
		if(err){
			throw err;
		}
		else{
			if(result){
				if(result['status'] == true){
					res.send(result)
				}else{
					res.send(result);
				}
			}
		}
	});
}
