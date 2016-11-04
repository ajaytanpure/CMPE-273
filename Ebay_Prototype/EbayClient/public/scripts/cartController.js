angular.module('homePageApp').controller('cartController',function($scope, $http, $log, $state, $rootScope, user) {
	
	if(!user.data.user){
		$rootScope.logoutlink = false;
		$state.go('userPage.signin');	
	}
	
	$scope.cartMessage = "";
	$rootScope.guest = user.data.user;
	$rootScope.userDiv = true;
	$rootScope.logoutlink = true;
	$rootScope.shoppingCart;
	$scope.totalValue = 0;
	
	
	$scope.calculate = function(){
		var total = 0;
		var prods = $rootScope.shoppingCart['products'];
		for(var counter in prods){
			total = total + prods[counter]['price'];
			$log.info(total);
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
			$scope.cartMessage = "Your Cart is Empty";
		}
	}, function(err){
		
	})
	
	

	
	$scope.removeProduct = function(product){
		var tempCart = {'products':[]};
		var flag = false;
		
		for(var counter in $rootScope.shoppingCart['products']){
			if($rootScope.shoppingCart['products'][counter]['prod_id'] == product['prod_id'] && flag == false){
				delete $rootScope.shoppingCart['products'][counter];
				flag = true;
			}
			else{
				tempCart.products.push($rootScope.shoppingCart['products'][counter]);
			}
		}
		
		$rootScope.shoppingCart = tempCart;		
		
		$http({
			method: "POST",
			url : "/addToCart",
			data : $rootScope.shoppingCart
		}).then(function(res){
			if(res.data['status'] == true){
				$log.info('Cart updated successfully');
				$scope.calculate();
				$state.reload;
			}
			else{
				console.log("Unexpected error occurred while updating the cart");
			}
		}, function(err){
				console.log("Unexpected error occurred while upating the cart");
		})	
	}
	
	
	$scope.checkOut = function(){
		$state.go('payment');		
	}
	
	
	
})