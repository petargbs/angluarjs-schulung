var Person = function(vorname, nachname){
	return {
		Vorname: vorname,
		Nachname: nachname
	};
};

angular
	.module('myApp', ['ngRoute'])
	.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/info', {
                templateUrl: 'templates/info.html',
                controller: 'Info'
            })
            .when('/imprint', {
                templateUrl: 'templates/imprint.html',
                controller: 'Imprint'
            })
            .when('/404', { templateUrl: 'templates/404.html' })
        .otherwise( { redirectTo: '/404' });

       $locationProvider.html5Mode(false);
    }])
	.controller('Main', function($scope){
		$scope.Persons = [];
		$scope.ErrorMessage = '';

		$scope.add = function(vorname, nachname){
			if(!vorname) return $scope.ErrorMessage = 'Enter a "vorname", please!';
			
			$scope.Persons.push(Person(vorname, nachname));
			$scope.ErrorMessage = '';
		};
		$scope.changed = function(person){
			console.log(person);
		};
		$scope.remove = function(person){
			var idx = $scope.Persons.indexOf(person);
			$scope.Persons.splice(idx, 1);
		};

		$scope.showPersons = function(){
			alert(JSON.stringify($scope.Persons));
		};

		$scope.sync = function(){

		};

	})
	.controller('Imprint', function($scope){

	})
	.controller('Info', function($scope){

	});


