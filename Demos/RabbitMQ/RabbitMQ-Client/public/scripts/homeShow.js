angular.module('homePageApp').controller('homeShowController',function($scope, $http, $log, $rootScope, $state) {
		
			$rootScope.user = false;

			$http({
				method : "POST",
				url : "/sessionActive",
				data : {}
			}).then(function(res){
				if(res.data['status'] == true){
					$rootScope.username = res.data['username'];
					$log.info($rootScope.username);
					$http({
						method : "POST",
						url : "/getDetails",
						data : {'username': $rootScope.username}
					}).then(function(res){
						$rootScope.Details = res.data['data'];
						$log.info($rootScope.Details)
						$rootScope.users = true;
					}, function(err){
						
					});
				}
				
			}, function(err){
				
		});
});




