var db_handler = require('./db_handler');
var crypto = require('crypto');
var myLogger = require('./logger');

exports.signin = function(req, res) {
	var params = {
		email : req.body['username']
	};
	db_handler.getData("SELECT * FROM users WHERE ?", params, function(result) {
		if (result != []) {			
			try {
				var decipher = crypto.createCipher("aes-256-ctr", "test");
				var pass = decipher.update(result[0]['password'],'hex', 'utf8');
				pass =  pass + decipher.final('utf8');
				
				if(pass == req.body['password']){
				//if (req.body['password'] === result[0]['password']) {
					console.log("Login successful");
					req.session.username = req.body['username'];
					response = {'status' : 'success'} ;
					res.send(response);
				} else {
					res.send({
						'status' : 'fail'
					})
				}
			} catch (e) {
				console.log("unexpected exception occurred" + e);
				res.send({
					'status' : 'fail'
				});
			}
		}
		res.send({
			'status' : 'fail'
		});
	})
};



exports.updateLogin = function(req, res){
	
	console.log('------------------ I came here for time');
	var params = {
			email : req.body['username']
		};
		db_handler.getData("UPDATE users set lastLogin = NOW() WHERE ?", params, function(result) {
			if (result != []) {			
				try {
					console.log("Updated login time");
				} catch (e) {
					console.log("unexpected exception occurred" + e);
					res.send({
						'status' : 'fail'
					});
				}
			}
			res.send({
				'status' : 'fail'
			});
		})
	
}



