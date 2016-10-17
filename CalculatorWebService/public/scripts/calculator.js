/**
 * http://usejsdoc.org/
 */

document
		.write('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>');

var app = angular.module("myCalculator", []);
app.controller('cController', function($scope, $http, $log) {
	$scope.message = "Hoa";
	$scope.expression = "";
	$scope.expressionStatus = '';

	var operand1 = '';
	var operator = '';
	var operator_final = '';
	var operand2 = '';
	var equal_used = false;

	// var op1_present = false;
	// var op2_present = false;
	// var operator_present = false;

	$scope.constructExp = function(token) {
		$scope.expressionStatus = "";
		if (operator === '') {
			operand1 = operand1 + token;
			$scope.expression = $scope.expression + token;
		}
		if (operator !== '' && operand1 !== '') {
			operand2 = operand2 + token;
			$scope.expression = $scope.expression + token;
		}
	}

	$scope.evaluateExp = function(token) {
		if (operator == '') {
			if (token === '=' || operand1 === '') {
				return;
			} else {
				operator = token;
				$scope.expression = $scope.expression + token;
			}
		} else {

			var expressionData = {
				'op1' : operand1,
				'operator' : operator,
				'op2' : operand2
			};

			if (token !== '=') {
				operator = token;
				$log.info(typeof($scope.expression));
				if(!equal_used){$scope.expression = $scope.expression.slice(0, $scope.expression.length - 1) + token;}
				else{$scope.expression = $scope.expression + token}
				$log.info($scope.expression);
				if (operand2 !== '') {
					$http({
						method : 'POST',
						url : "/calculate",
						data : expressionData,
					}).then(function(res) {
						equal_used = false;
						if (res.data['status'] == '') {
							result = res.data['val'];
							operand1 = result;
							operand2 = '';
							$scope.expression = result + token;
						}
						else{
							operand1 = '';
							operand2 = '';
							operator = '';
							$scope.expression = '';
							$scope.expressionStatus = res.data['status'];
						}
					}, function(err) {
						$scope.expressionStatus = "Unexpected error occurred";
					});
				}
			} else {
				$http({
					method : 'POST',
					url : "/calculate",
					data : expressionData,
				}).then(function(res) {
					equal_used = true;
					if (res.data['status'] == '') {
						result = res.data['val'];
						operand1 = result;
						operand2 = '';
						$scope.expression = result;
					}else{
						operand1 = '';
						operand2 = '';
						operator = '';
						$scope.expression = '';
						$scope.expressionStatus = res.data['status'];
					}
				}, function(err) {
					$scope.expressionStatus = "Unexpected error occurred";
				});

			}

		}
	}

	$scope.clearAll = function() {
		$scope.expression = "";
		$scope.expressionStatus = '';
		operand1 = '';
		operand2 = '';
		operator = '';
	}

});