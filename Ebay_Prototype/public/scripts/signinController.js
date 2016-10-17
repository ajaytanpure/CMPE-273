angular.module('homePageApp').controller('signinController',
		function($scope, $http, $log, $state) {
			$scope.signinUser = function(user) {
				$http({
					method : "POST",
					url : "/signin",
					data : user
				}).then(function(res) {
					$log.info(res.data);
					if (res.data['status'] == 'success') {
						$log.info("I am sending the data for login");
						$http({
							method : "POST",
							url : "/updateLogin",
							data : user
						}).then(function(res) {
							$log.info(res.data);
							if (res.data['status'] == 'success') {
								$state.go('home', {'user':user.email});
							}
						}, function(err) {
							$log.info("Something bad happenned");
						});
					}
				}, function(err) {
					$log.info("Something bad happenned");
				});

			}
		});