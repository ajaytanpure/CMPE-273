
var db_handler = require('./db_handler');

var mongo = require('/mongo');



exports.loadCategory = function(req, res){

	collection = mongo.db.collection("category");
	collection.find({}, function(err, result){
		console.log(result);
	});
}




// exports.loadCategory = function(req, res) {
// 	db_handler.getData("SELECT * FROM category", {}, function(result) {
// 		try {
// 			if (result != []) {
// 				res.send({
// 					'status' : true,
// 					'data' : result
// 				});
// 			} else {
// 				res.send({
// 					'status' : false
// 				})
// 			}
// 		} catch (err) {
// 			console.log("Exception occurred while getting the categories");
// 			conso.log(err);
// 			res.send({
// 				'status' : false
// 			});
// 		}

// 	})
// };



exports.insertProduct = function(req, res) {
	var params = req.body;
	db_handler.getData("INSERT INTO products SET ?", params, function(result) {
		try {
			if (result != []) {
				console.log("Product added")
				res.send({
					'status' : true
				})
			} else {
				res.send({
					'status' : false
				})
			}
		} catch (err) {
			res.send({
				'status' : false
			})
		}
	})
};
