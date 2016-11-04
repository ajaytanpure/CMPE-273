var db_handler = require('./db_handler');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var myLogger = require('./logger');
var mongo = require('./mongo');




module.exports = function(passport) {
	passport.use('signin', new LocalStrategy(
			function(username, password, done) {
				var params = {
					email : username
				};

				collection = mongo.db.collection("users");
				collection.findOne(params, function(err, res){
					if(res){
						var decipher = crypto.createCipher("aes-256-ctr", "test");
						var pass = decipher.update(res['password'], 'hex','utf8');
						pass = pass + decipher.final('utf8');
 						console.log(pass);
 						console.log(res);
 						if(pass == password){
 							return done(null, res);
 						}
 						else{
 							return done(null, false);
 						}
					}else{
						return done(null, false);
					}
						
				})

			}));
}


// RabbitMQ for signin is remaining. Not sure hoe to do it.
