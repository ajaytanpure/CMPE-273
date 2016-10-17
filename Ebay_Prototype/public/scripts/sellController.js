angular
		.module('homePageApp')
		.controller(
				'sellController',
				function($scope, $http, $log, $state, $rootScope, user) {
					
					if(!user.data.user){
						$log.info("ajshfgfjashgvaljgiulfgbca");
						$rootScope.logoutlink = false;
						$state.go('userPage.signin');
						
					}
					
					
					$rootScope.guest = user.data.user;
					$rootScope.userDiv = true;
					$log.info("User is " + user.data.user);
					$scope.categories = null;
					$scope.currentUser = user.data.user
					$log.info(user.data.user);

					// Server call to get the user id which is needed to be
					// inserted in product table
					if(user.data.user){
						$rootScope.logoutlink = true;
						$http({
							method : "POST",
							url : "/getUserId",
							data : {}
						})
								.then(
										function(res) {
											if (res.data['status'] == true) {
												$rootScope.guestUserId = res.data['data'][0]['id']
											} else {
												alert("Internal server error occurred. Please visit again later");
											}
										}, function(err) {

										});

					}
										// Method to handle the hiding of te divs and loading the
					// drop down menu with category by making server call
					$scope.createTitle = function(sell) {
						$scope.categoryTitle = sell.title;
						$scope.category = true;
						$scope.prodDetails = true;

						$http({
							method : "POST",
							url : "/loadCategory",
							data : {}
						})
								.then(
										function(res) {
											if (res.data['status'] == true) {
												$scope.categories = res.data['data'];
											} else {
												alert("Internal server error occurred. Please visit again later");
											}
										}, function(err) {

										});
					}

					// Method to construct the json data and to post it to
					// server for inserting into the products table
					$scope.sellProduct = function(sell) {

						// Following block to get the cat_id from cat_name from
						// the list stored locally
						var cat_id = null;
						var productDetails = null;
						for ( var counter in $scope.categories) {
							$log.info($scope.categories[counter])
							if ($scope.categories[counter]['cat_name'] === sell.category) {
								cat_id = $scope.categories[counter]['cat_id']
							}
						}

						// Construct the json for inserting data into product
						// Table
						productDetails = {
							'user_id' : $rootScope.guestUserId,
							'cat_id' : cat_id,
							'name' : sell.name,
							'description' : sell.description,
							'quantity' : sell.quantity,
							'bid' : sell.bid,
							'price' : sell.price
						}

						// Make POST request to server for inserting data into
						// products table

						$http({
							method : "POST",
							url : "/insertProduct",
							data : productDetails
						}).then(function(res) {
							if(res.data['status'] == true){
								$state.go('home');
							}
							else{
								$log.info("Error occurred while posting advertisement");
							}
						}, function(err) {

						});

					}

				});
