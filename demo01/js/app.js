var myApp = angular.module('myApp', []);

myApp
    .controller('main', function($scope) {
        $scope.vorname = '';
        $scope.nachname = '';

        $scope.Persons = [];

        $scope.show = function(name) {
            alert($scope.vorname || name);
        };
        $scope.show2 = function(name) {
            alert(name);
        };
        $scope.add = function(vorname, nachname) {
            $scope.Persons.push({
                id: $scope.Persons.length + 1,
                vorname: vorname,
                nachname: nachname
            });
        };
        $scope.remove = function(person) {
            var idx = $scope.Persons.indexOf(person);
            $scope.Persons.splice(idx, 1);
        };
    });