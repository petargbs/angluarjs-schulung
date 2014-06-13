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
        $scope.Persons = [];
        $scope.ErrorMessage = '';

        $scope.$on('bc_route_changed', function(e, args) {
            if (!args.args)
                return;
            var n = args.args !== '/' ? args.args.replace(/\//,'') : args.args;
            $scope.Breadcrumbs.push({
                'link': n
            });
        });

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

    })
    .run(function($rootScope) {
        $rootScope.$on('$routeChangeStart', function(e, args) {
            // console.log(args);
            $rootScope.$broadcast('bc_route_changed', { 
                args: args.$$route.originalPath
            });
        });
    });
