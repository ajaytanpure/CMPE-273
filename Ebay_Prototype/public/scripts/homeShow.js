angular.module('homePageApp').controller('homeShowController',
		function($scope, $http, $log, $rootScope, $state ,$stateParams) {
		
			$scope.products = null;
			$scope.cart = {'products':[]};
		//Check if session active
			$http({
				method : "POST",
				url : "/sessionActive",
				data : {
					'user' : $stateParams.user
				}
			}).then(function(res) {
				$log.info(res.data);
				if (res.data['active']) {
					if(res.data['user']){
						$rootScope.userDiv = true;
					}
					$rootScope.logoutlink = true;
					$rootScope.guest = res.data['user'];
					$log.info("Session is still active");
				}
				else{
					$rootScope.userDiv = false;
					$rootScope.logoutlink = false;
					$rootScope.guest = null;
					$state.go('home');
				}
			}, function(err) {
			});
			
		//Get all the products from database		
			$http({
				method : "POST",
				url : "/getProducts",
				data  : {}
			}).then(function(res){
				if(res.data['status'] == true){
					$scope.products = res.data['data'];
				}
				else{
					$log.info("Error occurred while retrieving the products");
				}
			}, function(err){
				$log.info("Error occurred while retrieving the products");
			});
			
		//Get cart
			$scope.getCart = function(){
				$http({
					method: "POST",
					url : "/getCart",
					data : {}
				}).then(function(res){
					if(res.data['status'] == true){
						$log.info(res.data['data']['products'][0]);
						$scope.cart = res.data['data'];
						$log.info('I got this from cart');
						$log.info($scope.cart.products.length);
					}
				}, function(err){
					$log.info("Fuck error occurred");
				});
			}
			
		//Check availability on server
			$scope.checkQuantity = function(product, res){
				$log.info(product);
				$log.info(res[0]);
				var avaialbleQuant = product['quantity'];
				var availedQuantity = 0;
				for(var counter in res){
					$log.info(res[counter]['prod_id']);
					$log.info(product['prod_id'])
					$log.info(availedQuantity);
					$log.info(avaialbleQuant);
					if(res[counter]['prod_id'] == product['prod_id']){
						availedQuantity++;
					}
				}
				
				if(availedQuantity === avaialbleQuant){
					$log.info("Check");
					alert('Only '+avaialbleQuant+' are avaialble. It seems you already have added to the cart');
					return true;
				}
			}
			
		//calculate total
			$scope.calTotal = function(){
				var prods = $scope.cart['products'];
				var total = 0;
				for(var counter in prods){
					total = total + prods[counter]['price'];
				}
				$rootScope.totalValue = total;
			}
			
			
		//get cart for updating
			$scope.getCartUpdate = function(product){
				$scope.cart['products'].push(product);
				$http({
					method: "POST",
					url : "/getCart",
					data : {}
				}).then(function(res){
						
						if(res.data['data']){
							if($scope.checkQuantity(product, res.data['data']['products']) == true){
								return;
							}
							$log.info("Async check");
							$scope.cart = res.data['data'];
							$scope.cart['products'].push(product);
						}
						else{
							$scope.cart = {'products':[]};
							$scope.cart['products'].push(product);
						}						
						$http({
							method: "POST",
							url : "/addToCart",
							data : $scope.cart
						}).then(function(res){
							
							if(res.data['status'] == true){
								$log.info('Added to the cart successfully');
								$scope.calTotal();
							}
							else{
								console.log("Unexpected error occurred while adding the products to the cart");
							}
						}, function(err){
								console.log("Unexpected error occurred while adding the products to the cart");
						})
				}, function(err){
					$log.info("Fuck error occurred");
				});
			}
			
			
		//Add the products to the  cart
			$scope.addToCart = function(product){				
				$http({
					method: "POST",
					url : "sessionActive",
					data : {}
				}).then(function(res){
					if(res.data['active'] == true){
						$scope.getCartUpdate(product);	
					}
					else{
						$log.info('I am m coming here');
						$state.go('userPage.signin');
					}
					
				}, function(err){
					
				})
			}
			
		//Start the bid
			$scope.startBid = function(product){
				$log.info(product);
				$state.go('bidIt', {productDetails:product},{ reload: true });
			}
			
			
			

			//API call to log the user clicks
				
				$scope.mapEvents = function(product){
					var data = {'prod_id' : product['prod_id'], 'name':product['name']}
					$http({
						method: "POST",
						url : "/mapEvents",
						data : data
					}).then(function(res){
						//Nothing to do here
					}).then(function(err){
						//Nothing to do here also
					});
				}

		});




