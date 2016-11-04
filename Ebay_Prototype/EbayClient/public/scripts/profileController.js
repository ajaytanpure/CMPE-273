angular.module('homePageApp').controller('profileController',function($scope, $http, $log, $state, $rootScope, user) {

	$rootScope.guest = user.data.user;
	$rootScope.userDiv = true;
	$rootScope.logoutlink = true;
	$rootScope.guestUserDetails;
	$scope.itemBought = [];
	$scope.itemSold = [];
	
	
	if(!user.data.user){
		$rootScope.logoutlink = false;
		$state.go('userPage.signin');	
	}
	
	$http({
		method : "POST",
		url : "/getUserDetails",
		data : {}
	}).then(function(res) {
		if (res.data['status'] == true) {
			$rootScope.guestUserDetails = res.data['data'][0];
		} else {
			alert("Internal server error occurred. Please visit again later");
			}
		}, function(err) {
	
	});
	

	$scope.updateMobile = function(user){
		$http({
			method: "POST",
			url : "/updateMobile",
			data : {'email': $rootScope.guest, 'mobile':user.mobile}
		}).then(function(res){
			if(res.data['status'] == true){
				$scope.displayMobileSuccess = true;
				$scope.message = "Mobile number updated successfully"
			}
			else{
				$scope.displayMobileError = true;
				$scope.message = "Error occurreed while updating mobile number"
			}
		}, function(err){
			
		})
	}
	
	
	$scope.updateBirthdate = function(user){
		$log.info(user.birthdate);
				$http({
			method: "POST",
			url : "/updateBirthdate",
			data : {'email': $rootScope.guest, 'birthdate':user.birthdate}
		}).then(function(res){
			if(res.data['status'] == true){
				$scope.displayBirthdateSuccess = true;
				$scope.message = "birthdate updated successfully"
			}
			else{
				$scope.displayBirthdateError = true;
				$scope.message = "Error occurreed while updating birthdate"
			}
		}, function(err){
			
		})
	}
	
	$scope.updateLocation = function(user){
		$http({
			method: "POST",
			url : "/updateLocation",
			data : {'email': $rootScope.guest, 'location':user.location}
		}).then(function(res){
			if(res.data['status'] == true){
				$scope.displayLocationSuccess = true;
				$scope.message = "location updated successfully"
			}
			else{
				$scope.displayLocationError = true;
				$scope.message = "Error occurreed while updating location"
			}
		}, function(err){
			
		})
	}
	
	
	$scope.viewBuyHistory = function(){
		$http({
			method : "POST",
			url : "/viewBuyHistory",
			data : {'user_id' : $rootScope.guestUserDetails['id']}
		}).then(function(res) {
			if (res.data['status'] == true) {
				$log.info("I got the details here");
				$scope.itemBought = res.data['data'];
				$scope.showBuyHistory = true;
				$scope.showSellHistory = false;
			} else {
				alert("Internal server error occurred. Please visit again later");
				}
			}, function(err) {
		});
		
		
	}
	
	$scope.viewSellHistory = function(){
		$http({
			method : "POST",
			url : "/viewSellHistory",
			data : {'user_id' : $rootScope.guestUserDetails['id']}
		}).then(function(res) {
			if (res.data['status'] == true) {
				$log.info("I got the details here");
				$scope.itemSold = res.data['data'];
				$scope.showBuyHistory = false;
				$scope.showSellHistory = true;
			} else {
				alert("Internal server error occurred. Please visit again later");
				}
			}, function(err) {
		});
	}	
})