var db_handler = require('./db_handler');
var crypto = require('crypto');
var mqClient = require('../rpc/client');
var mongo = require('./mongo');

exports.register = function(req, res){
	var cipher = crypto.createCipher("aes-256-ctr", "test");
	var pass = cipher.update(req.body['password'], 'utf8', 'hex');
	pass = pass + cipher.final('hex');

	var msgPayload = {
		email : req.body['username'],
		firstName : req.body['firstname'],
		lastName : req.body['lastname'],
		mobile : req.body['mobile'],
		password : pass
	};

	mqClient.make_request('register_queue', msgPayload, function(err, result){
		if(err){
			throw err;
		}else{
			if(result){
				res.send(result);
			}
		}
	});
}