var db_handler = require('./db_handler');
var fs = require('fs');
fs.writeFile("logs/events.log", "Event logs", function(err) {
	console.log("Error while writing file initially");
});


exports.getProducts = function(req, res) {
	var params = req.body;
	db_handler.getData("SELECT * FROM products p JOIN users u ON p.user_id = u.id where quantity > 0", params, function(result) {
		try {
			if (result != []) {
				res.send({
					'status' : true,
					'data' : result
				});
			} else {
				res.send({
					'status' : false
				})
			}
		} catch (err) {
			console.log("Exception occurred while getting the categories");
			conso.log(err);
			res.send({
				'status' : false
			});
		}

	})
};


exports.getProduct = function(req, res) {
	var params = req.body;
	db_handler.getData("SELECT * FROM products p JOIN users u ON p.user_id = u.id WHERE ?", params, function(result) {
	console.log(result);
		try {
			if (result != []) {
				res.send({
					'status' : true,
					'data' : result
				});
			} else {
				res.send({
					'status' : false
				})
			}
		} catch (err) {
			console.log("Exception occurred while getting the categories");
			conso.log(err);
			res.send({
				'status' : false
			});
		}

	})
};


exports.updateUserBuy = function(req, res){
	var data = req.body.pair;
	var product = {'prod_id':null};
	for(var counter in data){
		db_handler.insertUserData("INSERT INTO user_buy SET ?", data[counter], function(result){
			console.log('Record updated succesfully');
		})
		
		product['prod_id'] = data[counter]['prod_id'];
		db_handler.insertUserData("UPDATE products SET quantity = quantity -1 WHERE ?", product, function(result){
		});
		
		db_handler.insertUserData("UPDATE products SET quantitySold = quantitySold + 1 WHERE ?", product, function(result){
			req.session.usercart = null;
			res.send({'status':true});
		})
	}	
};


exports.addToCart = function(req, res){
	var data = req.body;
	console.log('one : ');
	console.log(req.session.usercart);
	console.log('two : ');
	console.log(req.body);
	req.session.usercart = req.body;
	
	res.send({'status':true});	
}


exports.getCart = function(req, res){
	console.log("I am returning the cart");
	var data = req.session.usercart;
	console.log(data);
	if(data){
		res.send({'status' : true, 'data' : data})
	}
	else{
		res.send({'status':false});
	}
}

exports.mapEvents = function(req, res){
	var userId = req.session.username;
	var message = "\nUser : " + userId +" has clicked on "+req.body['prod_id']+ " : " + req.body['name'];
	console.log(message);
	fs.appendFile("logs/events.log", message, function(err){
		console.log("Error while writing the event log");
	})

}



