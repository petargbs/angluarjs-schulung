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
            .when('/', {
                // default route
                redirectTo: '/welcome'
            })
            .when('/welcome', {
                templateUrl: 'templates/welcome.html',
                controller: 'Info'
            })
            .when('/info', {
                templateUrl: 'templates/info.html',
                controller: 'Info'
            })
            .when('/imprint', {
                templateUrl: 'templates/imprint.html',
                controller: 'Imprint'
            })
            .when('/404', { templateUrl: 'templates/404.html' })
        .otherwise({ redirectTo: '/404' });

       $locationProvider.html5Mode(false);
    }])
    .controller('Main', function($scope){
        $scope.Breadcrumbs = [];
        $scope.$on('bc_route_changed', function(e, args) {
            if (!args)
                return;
            var n = args.name !== '/' ? args.name.replace(/\//,'') : args.name;
            $scope.Breadcrumbs.push({
                'name': n,
                'uri': args.uri
            });
        });
    })
    .controller('Imprint', function($scope){

    })
    .controller('Info', function($scope){

    })
    .controller('Details', function($scope){
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

        $scope.add('Max', 'Mustermann 01');
        $scope.add('Max', 'Mustermann 02');
        $scope.add('Max', 'Mustermann 03');

    })
    .run(function($rootScope) {
        $rootScope.$on('$routeChangeStart', function(e, args) {
            console.log(args);
            $rootScope.$broadcast('bc_route_changed', { 
                name: args.$$route.originalPath,
                uri: args.$$route.originalPath
            });
        });
    });
