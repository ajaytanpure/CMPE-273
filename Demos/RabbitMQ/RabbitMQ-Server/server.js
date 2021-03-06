//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var login = require('./services/login');
var register = require('./services/register');


var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	cnn.queue('login_queue', function(q){
		
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			login.handle_request(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	cnn.queue('register_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){

			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			register.handle_request(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	})

});