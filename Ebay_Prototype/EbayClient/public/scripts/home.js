var homePage = angular.module('homePageApp', [ 'ui.router' ]);

homePage.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('/', {
		url : '/',
		templateUrl : '/templates/home.ejs'
	}).state('home', {
		url : '/home',
		templateUrl : '/templates/home.ejs',
		params : {
			'user' : null
		}
	}).state('userPage', {
		url : '/userPage',
		templateUrl : './templates/userPage.ejs'
	}).state('userPage.signin', {
		url : '/signin',
		templateUrl : './templates/signin.ejs',
		controller : 'signinController'
	}).state('userPage.register', {
		url : '/register',
		templateUrl : './templates/register.ejs',
		controller : 'registerController'
	}).state('sell', {
		url : '/sell',
		templateUrl: '/templates/sell.ejs',
		controller : 'sellController',
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	}).state('shoppingCart',{
		url : '/shoppingCart',
		templateUrl : '/templates/shoppingCart.ejs',
		controller : 'cartController',
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	}).state('profile',{
		url : '/profile',
		templateUrl : '/templates/profile.ejs',
		controller : 'profileController',
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	}).state('payment',{
		url : '/payment',
		templateUrl : '/templates/payment.ejs',
		controller : 'payController',
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	}).state('updateMobile',{
		url : '/updateMobile',
		templateUrl : '/templates/updateMobile.ejs',
		controller : 'profileController',
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	}).state('updateBirthdate',{
		url : '/updateBirthdate',
		templateUrl : '/templates/updateBirthdate.ejs',
		controller : 'profileController',
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	}).state('updateLocation',{
		url : '/updateLocation',
		templateUrl : '/templates/updateLocation.ejs',
		controller : 'profileController',
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	}).state('bidIt',{
		url : '/bidIt',
		templateUrl : '/templates/bidPage.ejs',
		controller : 'bidController',
		params: {
			productDetails : null
		},
		resolve : {
			user : function($http){
				return $http({
					method :"POST",
					url : "/sessionActive"
				});
			},
		}
	})
	
});

homePage.controller('homeController', function($http, $state, $scope,
		$rootScope, $log) {
	$scope.loginStatus = true;
	$rootScope.hideIt = function() {
		$rootScope.userDiv = true;
	}
	
	$rootScope.totalValue = 0;
	$rootScope.guestUserId = null;
	$scope.logout = function() {

		$http({
			method : "POST",
			url : "/sessionKill",
		}).then(function(res) {
			if (res.data['status'] == true) {
				$state.go('/');
			}
		})
	}

	
	//function to signin the user
	$scope.signinUser = function(user) {
		$http({
			method : "POST",
			url : "/signin",
			data : user
		}).then(function(res) {
			if (res.data['status'] == 'success') {
				$rootScope.guest = user.username;
				$rootScope.globalUser = user.username;
				
				$http({
					method: "POST",
					url : "/updateLogin",
					data : user
				}).then(function(res){
					// Last login time updated successfully 
				})
				$state.go('home', {
					'user' : user.username
				});
			} else {
				$scope.loginStatus = false;
			}
		}, function(err) {
			$log.info("Error occurred while signing in");
		});
	}

	// function to register the new user
	$scope.registerUser = function(user) {
		$http({
			method : "POST",
			url : "/register",
			data : user
		}).then(function(response) {
			$log.info("Success registered" + response.data['status'])
			if (response.data['status'] == true) {
				alert("User Registered Successfully. Please Login again");
				$state.go('/');
			}
		}, function(err) {
			$log.info("Error occurred while signing in");
		});
	}
	
	$scope.loadAdds = function(){
		$http({
			method : "POST",
			url : "/getProducts",
			data  : {}
		}).then(function(res){
			if(res.data['status'] == true){
				$log.info("Good");
				$log.info(res.data['data']);
			}
			else{
				$log.info("Error occurred while retrieving the products");
			}
		}, function(err){
			$log.info("Error occurred while retrieving the products");
		});
		
	
	
	}	
})
