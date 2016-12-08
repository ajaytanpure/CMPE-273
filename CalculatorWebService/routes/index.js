/*
 * GET home page.
 */

 var soap = require('soap');
 var baseURL = "http://localhost:8080/SOAPCalculator/services";


 exports.index = function(req, res) {
 	res.render('calculator.ejs');
 };

 exports.calculate = function(req, res) {
 	var option = {
 		ignoredNamespaces : true	
 	};

 	var op1 = req.body['op1'];
 	var op2 = req.body['op2'];
 	var op = req.body['operator'];
 	var result = {
 		'val' : '',
 		'status' : ''
 	}

 	var url = baseURL+"/Calculate?wsdl";
 	var args = {"value":3}

 	console.log(op1 + " " + op + " " + op2);
 	try {
 		if (op === '+') {
 			var args = {"op1":op1, "operator":"+", "op2":op2}
 			soap.createClient(url,option, function(err, client) {
 				console.log(err)
 				client.calculate(args, function(err, result1) {
 					console.log(result1.calculateReturn);
 					result['val'] = result1.calculateReturn.toString();
 					console.log(result['val']);
 					res.send(result);
 				});
 			});

 		} else if (op === '-') {
 			var args = {"op1":op1, "operator":"-", "op2":op2}
 			soap.createClient(url,option, function(err, client) {
 				console.log(err)
 				client.calculate(args, function(err, result1) {
 					console.log(result1.calculateReturn);
 					result['val'] = result1.calculateReturn.toString();
 					console.log(result['val']);
 					res.send(result);
 				});
 			});
 		} else if (op === '*') {
 			var args = {"op1":op1, "operator":"*", "op2":op2}
 			soap.createClient(url,option, function(err, client) {
 				console.log(err)
 				client.calculate(args, function(err, result1) {
 					console.log(result1.calculateReturn);
 					result['val'] = result1.calculateReturn.toString();
 					console.log(result['val']);
 					res.send(result);
 				});
 			});
 		} else if (op === '/') {

 			console.log(typeof (op2));
 			if (op2 == '0') {
 				console.log('In division');
 				throw 'Divide By Zero error'
 			}
 			;
 			var args = {"op1":op1, "operator":"/", "op2":op2}
 			soap.createClient(url,option, function(err, client) {
 				console.log(err)
 				client.calculate(args, function(err, result1) {
 					console.log(result1.calculateReturn);
 					result['val'] = result1.calculateReturn.toString();
 					console.log(result['val']);
 					res.send(result);
 				});
 			});
 		}
 	} catch (err) {
 		console.log('in exception');
 		result['status'] = err;
 		res.send(result);
 	}
 };