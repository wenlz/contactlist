/*(function(){
	'use strict';
	angular
		.module('myApp', ['ui.router', 'routerApp'])
})();*/

// (function(){
// 	'use strict';
// 	angular
// 		.module('myApp', [])
// 		.controller('AppCtrl', AppCtrl)

// 	AppCtrl.$inject = ['$http', '$scope', '$timeout']


// 	function AppCtrl($http, $scope, $timeout ){
// 		// console.log($route.$RouteProvider)
// 		 console.log('ha')
// 		// console.log('$http: ' + $http)
// 		// console.log($timeout)
// 		 // console.log($stateProvider)
// 	}
// })();
// var myApp = angular.module('myApp', []);
// myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
// 	console.log('Hello world from controller');
// 	console.log('AppConfig : ')
// 	// console.log(AppConfig)
// 	var vm = this;
// 	vm.goblok = 'tolol'
// 	var refresh = function() {
// 		$http.get('/').success(function(response) {
// 		    console.log("I got the data I requested");
// 		    $scope.userlist = response;
// 		    $scope.contact = "";
// 		});
// 	};

// 	refresh();

// }]);

// myApp.service('AppConfig', ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
// 	console.log('user');

// }])
/*
(function(){
	'use strict';
	angular.module('conf', [])

})();

(function(){
	'use strict';
	angular
		.module('conf')
		.config('AppConfig', AppConfig)

	AppConfig.$inject = ['$stateProvider']
	function AppConfig($stateProvider){
		var vm = this;

		vm.goblok = "haha"

		// $urlRouterProvider.otherwise('/app/gobs')

		// $stateProvider
			// .state('app', {
			// 	url: '/app',
			// 	abstract: true,
			// 	templateUrl: 'index.html'
			// })
			// .state('user',{
			// 	title: 'gobs',
			// 	url: '/gobs',
			// 	templateUrl: 'gobs.html'
			// })
	}
})();
*/

/*(function(){
	// var routerApp = angular.module('routerApp', ['ui.router']);
	angular
		.module('routerApp', ['ui.router'])
})();

(function (){*/
	// routerApp.config(function($stateProvider, $urlRouterProvider) {

	//     $urlRouterProvider.otherwise('/home');

	//     $stateProvider

	//         // HOME STATES AND NESTED VIEWS ========================================
	//         .state('home', {
	//             url: '/home',
	//             templateUrl: 'partial-home.html'
	//         })

	//         // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	//         .state('about', {
	//             // we'll get to this in a bit
	//         });

	// });

/*var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

	angular.module('routerApp')
		.config(routerApp);

	routerApp.$inject = ['$stateProvider', '$urlRouterProvider']

	function routerApp($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/home');

	    $stateProvider

	        // HOME STATES AND NESTED VIEWS ========================================
	        .state('home', {
	            url: '/home',
	            abstract: true,
              	templateUrl: '/gobs.html',
              	title: 'HAD	'
	        })

	        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	        .state('about', {
	            // we'll get to this in a bit
	        });

	};
})();
*/

var myApp = angular.module('myApp', ['ui.router']);
myApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	console.log('Welcome to controller');

	$stateProvider
			// HOME STATES AND NESTED VIEWS ========================================
	        .state('/home', {
	            url: '/home',
              	templateUrl: 'views/home.html',
              	controller: 'homeCtrl'
	        })
	        .state('/contact', {
	            url: '/contact',
              	templateUrl: 'views/contact.html',
              	// controller: 'homeCtrl'
	        })
					.state('/login', {
	            url: '/login',
              	templateUrl: 'views/login.html',
              	controller: 'loginCtrl'
	        })
					.state('/signup', {
	            url: '/signup',
              	templateUrl: 'views/signup.html',
              	controller: 'signupCtrl'
	        })
	        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	        .state('/create', {
	            // we'll get to this in a bit
	          	url: '/create',
              	templateUrl: 'views/form.html' ,
              	controller: 'createCtrl'
	        })
	        .state('/detail', {
	            // we'll get to this in a bit
	          	url: '/detail/:id',
              	templateUrl: 'views/detail.html' ,
              	controller: 'detailCtrl'
	        })
	        .state('/edit', {
	            // we'll get to this in a bit
	          	url: '/edit/:id',
              	templateUrl: 'views/form.html' ,
              	controller: 'editCtrl'
	        });
});

myApp.controller('createCtrl', function($scope, $http) {

  	$scope.position = 'Create';

  	$scope.friend = {};
  	$scope.friend.birthday ='2012-10-10';
  	console.log($scope)
	$scope.save = function() {
	  	// check to make sure the form is completely valid
    	if ($scope.friendForm.$valid) {
	  		$http.post('/', $scope.friend).success(function(response) {
		    	$scope.alerts = [{
    				type: 'success', msg: 'Saved add more'
    			}];
		  	});
	  	}else{
	  		$scope.alerts = [{
	  			type: 'danger', msg: 'Error'
	  		}];
	  	}
	};

	$scope.closeAlert = function(index) {
    	$scope.alerts.splice(index, 1);
  	};

});

myApp.controller('detailCtrl', function($http, $scope, $state) {
  	console.log('detail controller');

  	$http.get('/friend/' + $state.params.id).success(function(response){
			console.log(response);
			$scope.friend = response.friend;
	});
});

myApp.controller('editCtrl', function($scope, $http, $state) {
	console.log($state.params);
	$scope.position = 'Edit';
	$http.get('/friend/' + $state.params.id).success(function(response){
			console.log(response);
			$scope.friend = response.friend;
		});

	$scope.save = function(){
		if ($scope.friendForm.$valid) {
			$http.put('/friend/' + $state.params.id, $scope.friend).success(function(response){
				$scope.alerts = [{
	    			type: 'success', msg: 'Updated'
	    		}];
			});
		}else{
			$scope.alerts = [{
				type: 'danger', msg: 'Error'
			}];
		}
	}

	$scope.closeAlert = function(index) {
    	$scope.alerts.splice(index, 1);
  	};
});

myApp.controller('homeCtrl', function($http, $scope, $state) {

  	console.log('home controller');
  	$scope.search   = '';     // set the default search


	$scope.refresh = function() {
	  $http.get('/friends').success(function(response) {
	    if(response.success){
	    	$scope.friends = response.friends;
	    }
	  });
	};
	$scope.refresh();

	$scope.ok = function (){
		//$scope.close({$value: $scope.})
	}

  	$scope.remove = function(id) {

  		console.log(id);
  		// $http.delete('/friend/' + id).success(function(response) {
    	// 	$scope.refresh();
    	// 	$scope.alerts = [{
    	// 		type: 'success', msg: 'Deleted'
    	// 	}];
  		// });
	};

	$scope.deleteAll = function() {
  		console.log("delete All controller");
  		$http.delete('/friend/').success(function(response) {
    		$scope.refresh();
    		$scope.alerts = [{
    			type: 'success', msg: 'Delete All'
    		}];
  		});
	};

	$scope.edit = function(id) {
		$state.go('/edit', {id: id})
	};

	$scope.detail = function(id) {
		$state.go('/detail', {id: id})
	};
});


myApp.controller('loginCtrl', function($http, $scope, $state) {

	$scope.signup = function(id) {
		$state.go('/signup');
	};

});

myApp.controller('signupCtrl', function($http, $scope, $state) {
	$scope.signup = function(){
		console.log($scope.userForm);
		if ($scope.userForm.$valid) {
			$http.post('/signup', $scope.user).success(function(response){
				$scope.alerts = [{
	    			type: 'success', msg: 'Success'
	    		}];
			});
		}else{
			$scope.alerts = [{
				type: 'danger', msg: 'Error'
			}];
		}
	}

	$scope.closeAlert = function(index) {
    	$scope.alerts.splice(index, 1);
  	};
});
