var mysql = require('mysql');
var conn;

var getDbConnection = function() {
	conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root123',
		database : 'StartTest'
	});

	conn.connect(function(err) {
		if (err) {
			throw err;
		}
		console.log('Connection established');
	});
}

exports.getData = function(userQuery, params, callback) {
	getDbConnection();
	conn.query(userQuery, params, function(err, result) {
		if (err) {
			console.log("Error occurred while executing the query");
			throw (err);
		}
		if (result) {
			callback(result);
		}

	});
}

exports.insertUserData = function(userQuery, params, callback) {

	getDbConnection();
	conn.query(userQuery, params, function(err, result) {
		if (err) {
			console.log("Error occurred while executing the insert query");
		}
		if (result) {
			callback(result);
		}
	});
}

