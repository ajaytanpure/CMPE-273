//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var login = require('./services/login');
var register = require('./services/register');
var sell = require('./services/sell');
var products = require('./services/products');
var homeBasics = require('./services/homeBasics');


var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){

	
	//Register Queue

	cnn.queue('register_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log(message);
			console.log('-----');
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			register.registerUser(message, function(err,res){
				console.log('in publishing');
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//getUseriD Queue
	cnn.queue('getUserId_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.getUserId(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//getUserDetails queue
	cnn.queue('getUserDetails_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.getUserDetails(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//viewBuyHistory
	cnn.queue('viewBuyHistory_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.viewBuyHistory(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//viewSellHistory queue
	cnn.queue('viewSellHistory_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.viewSellHistory(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});		


	//updateMobile queue
	cnn.queue('updateMobile_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.updateMobile(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});		


	//updateBirthdate queue
	cnn.queue('updateBirthdate_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.updateBirthdate(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});	


	//updateLocation queue
	cnn.queue('updateLocation_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.updateLocation(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//updateLogin queue
	cnn.queue('updateLogin_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.updateLogin(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//bitIt queue
	cnn.queue('bidIt_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			homeBasics.bidIt(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});	


	//loadCategory queue
	cnn.queue('loadCategory_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			sell.loadCategory(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});	


	//insertProduct
	cnn.queue('insertProduct_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			sell.insertProduct(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//getProducts queue
	cnn.queue('getProducts_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			products.getProducts(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//getProduct queue
	cnn.queue('getProduct_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			products.getProduct(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});


	//updateUserBuy queue
	cnn.queue('updateUserBuy_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			products.updateUserBuy(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});



});





