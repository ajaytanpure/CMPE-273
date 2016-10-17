angular.module('homePageApp').controller('bidController',function($scope, $http, $log, $state, $rootScope, user) {
	
	
	if(!user.data.user){
		$rootScope.logoutlink = false;
		$state.go('userPage.signin');	
	}
	
	$rootScope.guest = user.data.user;
	$rootScope.userDiv = true;
	$rootScope.logoutlink = true;
	$scope.userId;
	$rootScope.product = $state.params.productDetails
	if($rootScope.product == null){
		$state.go('home');
		return;
	}

	
	$http({
		method: "POST",
		url : '/getUserId',
		data : {}
	}).then(function(res){
		if(res.data['status'] == true){
			$scope.userId = res.data['data'][0]['id'];
		}
	}, function(err){
		
	})
	
	
	
	
	
	
	$scope.allInfo;
	
	$http({
		method: "POST",
		url : '/getProduct',
		data : {'prod_id':$rootScope.product['prod_id']}
	}).then(function(res){
		if(res.data['status'] == true){
			$scope.allInfo = res.data['data'][0];
			if( $scope.allInfo['highestBid'] == 0){
				$scope.allInfo['highestBid'] = $scope.allInfo['price']
			}
		}
		else{
			alert('Unexpected Error occurred');
			$state.go('home');
		}
	}, function(err){
		alert('Unexpected Error occurred');
		$state.go('home');
	})
	
	$scope.palceBid = function(bid){
		
		var data = {'user_id' : $scope.userId, 'prod_id':$scope.allInfo['prod_id'], 'price':bid.price}
		
		$http({
			method: "POST",
			url : '/bidIt',
			data : data
		}).then(function(res){
			if(res.data['status'] ==  true){
				$scope.message = "Bid place successfully";
				$scope.finalMessage = true
			}
		}, function(err){
			
		})
	}
	
	
	
})