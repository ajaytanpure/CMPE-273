angular.module('homePageApp').controller('payController',function($scope, $http, $log, $state, $rootScope, user) {
	
	$scope.totalValue;	
	$rootScope.guest = user.data.user;
	$rootScope.userDiv = true;
	$rootScope.logoutlink = true;
	$scope.items = 0;

	
	$scope.calculate = function(){
		var total = 0;
		var prods = $rootScope.shoppingCart['products'];
		$scope.items = prods.length;
		$log.info($scope.items);
		for(var counter in prods){
			total = total + prods[counter]['price'];
		}
		$scope.totalValue = total;
		$rootScope.totalValue = total;
	}
	
	$http({
		method: "POST",
		url : "/getCart",
		data : {}
	}).then(function(res){
		if(res.data['status'] == true){
			$rootScope.shoppingCart = res.data['data'];
			$scope.calculate();
		}
		else{
			//
		}
	}, function(err){
		
	})
	
	
	
	$scope.updatecheckOut = function(data){
		
		$http({
			method: "POST",
			url	 :  "/updateUserBuy",
			data : data,
		}).then(function(res){
			if(res.data['status'] == true){
				$log.info("Records updated successfully");
				$state.go('home');
			}
		}, function(err){
			$state.go('home');
		});
		
		
	}
	
	
	$scope.confirmCheckOut = function(checkout){
		$log.info("I am here------------");
		$scope.status = false;
		if(!checkout || !checkout.name || !checkout.card || !checkout.cvv){
			$scope.status = true;
			$log.info("Aila");
		}
		else if(checkout.card.length < 15 || checkout.cvv.length < 3){
			$scope.status = true;
		}
		if($scope.status){
			return;
		}
		$http({
			method : "POST",
			url : "/getUserId",
			data : {}
		}).then(function(res) {
			if (res.data['status'] == true) {
				$rootScope.guestUserId = res.data['data'][0]['id'];
				var data = {'pair' :[]}
				for(var counter in $scope.shoppingCart['products']){
					var temp = {'user_id':null, 'prod_id':null};
					temp['user_id'] = $rootScope.guestUserId;
					temp['prod_id'] = $scope.shoppingCart['products'][counter]['prod_id'];
					data.pair.push(temp);
				}
				$scope.updatecheckOut(data);
			
			} else {
				alert("Internal server error occurred. Please visit again later");
				}
			}, function(err) {

			});		
	}
})