var mysql = require('mysql');


var connStack = [];
var connQueue;

var createMyPool = function(dbDetails){
	var conn;
	console.log("Creating connections");
	for(var counter = 0; counter < dbDetails.noConn; counter++){
		console.log("Creating connections");
		conn = mysql.createConnection({
			host : dbDetails.host,
			user : dbDetails.user,
			password : dbDetails.password,
			database : dbDetails.database
		});
	connStack.push(conn);
	}
	return this;
}


createMyPool.prototype.getMyConnection = function(callback){
	console.log("Length of the stack point 1 : " + connStack.length);
	if(connStack.length != 0){
		connection = connStack.pop();
		console.log("Length of the stack point 2 : " + connStack.length);
		callback(null,connection);
	}
	else{
		connQueue.push(callback);
	}
}


createMyPool.prototype.releaseMyConnection = function(connectionObj){
	console.log("What Am I doing here");
	console.log(typeof(connectionObj));
}


module.exports.createMyPool = createMyPool;
module.exports.createMyPool.getMyConnection = createMyPool.getMyConnection;