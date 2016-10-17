/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('calculator.ejs');
};

// exports.calculate = function(req, res) {
// var exp = req.body['exp'];
// console.log("Exprssion from client : " + exp);
// var result = {
// 'val' : '',
// 'valid' : true,
// 'msg' : ''
// };
//	
// try {
// result['val'] = eval(exp);
// console.log("Result : " + result['val']);
// if (result['val'] == Infinity) {
// result['msg'] = 'Divide By Zero Error';
// throw "DivideByZeroError"
// }
// res.send(result);
// } catch (err) {
// console.log(err);
// result['valid'] = false;
// if (result['msg'] == '') {
// result['msg'] = 'Please Check The Expression Syntax';
// }
// res.send(result);
// }
//
// };

exports.calculate = function(req, res) {
	var op1 = req.body['op1'];
	var op2 = req.body['op2'];
	var op = req.body['operator'];
	var result = {
		'val' : '',
		'status' : ''
	}
	console.log(op1 + " " + op + " " + op2);
	try {
		if (op === '+') {
			var tmp = parseFloat(op1) + parseFloat(op2);
			result['val'] = tmp.toString();
			console.log(result['val']);
			res.send(result);
		} else if (op === '-') {
			var tmp = parseFloat(op1) - parseFloat(op2);
			result['val'] = tmp.toString();
			console.log(result['val']);
			res.send(result);
		} else if (op === '*') {
			var tmp = parseFloat(op1) * parseFloat(op2);
			result['val'] = tmp.toString();
			console.log(result['val']);
			res.send(result);
		} else if (op === '/') {

			console.log(typeof (op2));
			if (op2 == '0') {
				console.log('In division');
				throw 'Divide By Zero error'
			}
			;
			var tmp = parseFloat(op1) / parseFloat(op2);
			result['val'] = tmp.toString();
			console.log(result['val'])
			res.send(result);
		}
	} catch (err) {
		console.log('in exception');
		result['status'] = err;
		res.send(result);
	}
};