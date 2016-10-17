var db_handler = require('./db_handler');
var myLogger = require('./logger');

myLogger.logger.info("This simple log written by another file");


exports.index = function(req, res) {
	res.render('index', {
		title : 'Express'
	});
};

exports.sessionActive = function(req, res) {
	if (req.session.username) {
		res.send({
			'active' : true,
			'user' : req.session.username
		})
	} else {
		res.send({
			'active' : false
		})
	}
};

exports.sessionKill = function(req, res) {
	req.session.destroy();
	res.send({
		'status' : true
	});
};

exports.getUserId = function(req,res){
	var params = {'email' : req.session.username};
	
	db_handler.getData("SELECT id FROM users where ? limit 1",params, function(result){
		try{
			console.log(result);
			if(result != []){
				res.send({'status' :true, 'data':result});
			}
			else{
				res.send({'status' : false})
			}
		}catch(err){
			console.log("Exception occurred while getting the categories");
			conso.log(err);
			res.send({'status' : false});
		}
	})	
}; 


exports.getUserDetails = function(req, res){
	var params = {'email' : req.session.username};
	
	db_handler.getData("SELECT * FROM users where ?", params, function(result){
		try{
			console.log(result);
			if(result != []){
				res.send({'status' :true, 'data':result});
			}
			else{
				res.send({'status' : false})
			}
		}catch(err){
			console.log("Exception occurred while getting the categories");
			conso.log(err);
			res.send({'status' : false});
		}		
	});	
};


exports.viewBuyHistory = function(req, res){
	console.log(req.body);
	var params = {'ub.user_id' : req.body['user_id']};
	db_handler.getData("SELECT * FROM products p JOIN user_buy ub ON p.prod_id = ub.prod_id WHERE ?", params, function(result) {
		try{
			console.log(result);
			if(result != []){
				res.send({'status' :true, 'data':result});
			}
			else{
				res.send({'status' : false})
			}
		}catch(err){
			console.log("Exception occurred while getting the categories");
			conso.log(err);
			res.send({'status' : false});
		}
	});
}
	
exports.viewSellHistory = function(req, res){
	console.log(req.body);
	var params = {'user_id' : req.body['user_id']};
	db_handler.getData("SELECT * FROM products WHERE ?", params, function(result) {
		try{
			console.log(result);
			if(result != []){
				res.send({'status' :true, 'data':result});
			}
			else{
				res.send({'status' : false})
			}
		}catch(err){
			console.log("Exception occurred while getting the categories");
			conso.log(err);
			res.send({'status' : false});
		}
		
	});

}

exports.updateMobile = function(req, res){
	console.log(req.body);
	var params = [{'mobile':req.body['mobile']},{'email' : req.body['email']}];
	console.log(params);
	
	db_handler.getData("UPDATE users SET ? WHERE ?", params, function(result){
		try{
			res.send({'status' :true});
		}catch(err){
			console.log("Exception occurred while updating mobile");
			conso.log(err);
			res.send({'status' : false});
		}
	});
}


exports.updateBirthdate = function(req, res){
	console.log(req.body);
	var params = [{'birthdate':req.body['birthdate']},{'email' : req.body['email']}];
	console.log(params);
	
	db_handler.getData("UPDATE users SET ? WHERE ?", params, function(result){
		try{
			res.send({'status' :true});
		}catch(err){
			console.log("Exception occurred while updating birthdate");
			conso.log(err);
			res.send({'status' : false});
		}
	});
}

exports.updateLocation = function(req, res){
	console.log(req.body);
	var params = [{'location':req.body['location']},{'email' : req.body['email']}];
	console.log(params);
	
	db_handler.getData("UPDATE users SET ? WHERE ?", params, function(result){
		try{
			res.send({'status' :true});
		}catch(err){
			console.log("Exception occurred while updating location");
			conso.log(err);
			res.send({'status' : false});
		}
	});
}

exports.bidIt = function(req, res){
	var params = req.body
	var outerParams = {'prod_id':params['prod_id']}
	db_handler.insertUserData("INSERT INTO user_bid SET ?", params, function(result){
		myLogger.logger.info("Bidding Added " + params);
		db_handler.insertUserData("select * from user_bid  where (prod_id,price) in (select prod_id,max(price) as maxpprice from user_bid  where ?);",
				outerParams, function(result) {
			var innerParams = [{'highestBid' : result[0]['price'],'bidUserId':result[0]['user_id']},{'prod_id':result[0]['prod_id']}]
			db_handler.insertUserData("UPDATE products SET ? WHERE ?", innerParams, function(res){
				myLogger.logger.info("Highest Bid till npe " + innerParams);
				myLogger.logger.info('Updated the product database with highest bid value');
			})
		})		
		res.send({'status': true});
	})
}

setInterval(function(){
	db_handler.getData("select * from products where timeAdded <= (DATE_SUB(NOW(), INTERVAL 4 DAY)) and quantity > 0 and highestBid > 0 limit 1", {}, function(result) {
		if(result.length < 0){
			console.log("Ola ola ola");
			myLogger.logger.info("No valid bidding avaiable yet or bidding is still in process");
		}
		
		for(var counter in result){
			console.log("Hey!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + counter);
			var dataParams = {'prod_id' : result[counter]['prod_id'], 'user_id' : result[counter]['bidUserId']}
			var prodQuantity = result[counter]['quantity'];
			var deleteParams = {'prod_id' : result[counter]['prod_id']};
			var updateQuant = [{'quantity' : 0, 'quantitySold': result[counter]['quantity']},{'prod_id' : result[counter]['prod_id']}];
			myLogger.logger.info("Closing bid for product " + dataParams['prod_id']);
			db_handler.insertUserData("INSERT INTO user_buy set ? ", dataParams, function(resultOutere){
				myLogger.logger.info("Product " + dataParams['prod_id'] + "Added to user cart User Id : " + dataParams['user_id']);
				for(var innerCounter = 0; innerCounter < prodQuantity -1; innerCounter++){
					db_handler.insertUserData("INSERT INTO user_buy set ? ", dataParams, function(output){
						//Nothing to here;
					});
				}
				db_handler.insertUserData("UPDATE products SET ? WHERE ?", updateQuant, function(resultInner){
					myLogger.logger.info('Bidding has been completed');
					db_handler.insertUserData("DELETE FROM user_bid WHERE ?", deleteParams, function(res){
					});
				});
			});	
		}
	});
},30000);








