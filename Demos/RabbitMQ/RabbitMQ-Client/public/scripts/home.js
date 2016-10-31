var homePage = angular.module('homePageApp', [ 'ui.router']);

homePage.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('/', {
		url : '/',
		templateUrl : '/templates/home.ejs',
		controller : 'homeShowController',
	}).state('home', {
		url : '/home',
		templateUrl : '/templates/home.ejs',
		controller : 'homeShowController'
	}).state('userPage', {
		url : '/userPage',
		templateUrl : './templates/userPage.ejs',
		controller : 'homeController'
	}).state('userPage.signin', {
		url : '/signin',
		templateUrl : './templates/signin.ejs',
		controller : 'homeController'
	}).state('userPage.register', {
		url : '/register',
		templateUrl : './templates/register.ejs',
		controller : 'homeController'
	})	
});

homePage.controller('homeController', function($http, $state, $scope,
		$rootScope, $log) {
		
	
	
	$scope.sessionA = function(){
		$http({
			method : "POST",
			url : "/sessionActive",
			data  : {}
		}).then(function(res){
			if(res.data['status'] == true){
				$rootScope.guest = true;
				$rootScope.guestname = res.data['username'];
				$rootScope.userDiv = true;
				$rootScope.logoutlink = true;
				$state.go('home');
			}
		}, function(err){
			
		})
		
	}
	
	$scope.sessionA();
	
	$scope.signinUser = function(user){
		$log.info(user.username);
		$log.info(user.password);
		
		$http({
			method : "POST",
			url : "/signin",
			data : user
		}).then(function(res){
			if(res.data['status'] == true){
				$rootScope.logoutlink = true;
				$rootScope.userDiv = true;
				$scope.sessionA();
				$rootScope.user = res.data['data'];
				$log.info($rootScope.user);
				$state.go('home');
			}
			else{
				$scope.loginStatus = true;
			}
			$log.info(res.data['status']);
		}, function(err){
			
		})
	}
	
	
	$scope.registerUser = function(user){		
		$http({
			method : "POST",
			url : "/register",
			data : user
		}).then(function(res){
			if(res.data['status'] ==  true){
				alert("Registered Successfully");
				$state.go('userPage.signin');
			}
			else{
				alert('Error occurred while registering the user');
			}
		}, function(err){
			alert('Error occurred while registering the user');
		})
	}
	
	
	$scope.logout = function(){
		$http({
			method : "POST",
			url : "/logout",
			data : {}
		}).then(function(res){
			if(res.data['status'] ==  true){
				$rootScope.userDiv = false;
				$rootScope.guest = false;
				$rootScope.logoutlink = false;
				$rootScope.users = false;
				$log.info("logged out");
				$state.go('home');
			}
		}, function(err){
			
		})
		
	}
	
	
	
	
	
	
})
