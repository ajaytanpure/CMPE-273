var mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var db;

var mongoUrl = "mongodb://localhost:27017/testEbay";
/**
 * Connects to the MongoDB Database with the provided URL
 */



var setVariable = function(){
    exports.db = db;
}

exports.connect = function(callback){
    if(!db){
        MongoClient.connect(mongoUrl, function(err, _db){
            if (err) { throw new Error('Could not connect: '+err); }
            db = _db;
            connected = true;
            setVariable();
            console.log(connected +" is connected?");
            callback(db);
        });     
    }else{
        console.log("Not connected tis time as I am already connected");
        callback(db);
    }
    
};


//exports.db = db;



// // Initialize connection once
// MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, database) {
//   if(err) throw err;

//   db = database;

//   // Start the application after the database connection is ready
//   app.listen(3000);
//   console.log("Listening on port 3000");
// });