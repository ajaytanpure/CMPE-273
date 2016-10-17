angular.module('homePageApp').controller('registerController', function($scope, $http, $log){
	$scope.registerUser = function(user){
		$http({
			method: "POST",
			url : "/register",
			data : user
		}).then(function(res){
			$hhtp({
				url : '/home',
				method : "POST",
			}).then(function(response){
				$log.info('Something something');
			})
			
		},function(err){
			$log.info("Something bad happenned");
		});
		
	}
});