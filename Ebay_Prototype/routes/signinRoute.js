var db_handler = require('./db_handler');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var myLogger = require('./logger');

module.exports = function(passport) {
	passport.use('signin', new LocalStrategy(
			function(username, password, done) {
				var params = {
					email : username
				};

				db_handler.getData("SELECT * FROM users WHERE ?", params,
						function(result) {
							if (result != []) {
								try {
									var decipher = crypto.createCipher(
											"aes-256-ctr", "test");
									var pass = decipher.update(
											result[0]['password'], 'hex',
											'utf8');
									pass = pass + decipher.final('utf8');

									if (pass == password) {
										console.log("Password matches");
										return done(null, result)
									} else {
										return done(null, false)
									}
								} catch (err) {
									console.log(err);
									return done(null, false);
								}
							}
						})
			}));
}
