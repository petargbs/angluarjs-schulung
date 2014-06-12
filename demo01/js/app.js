var myApp = angular.module('myApp', []);

myApp
    .controller('main', function($scope) {
        $scope.vorname = '';
        $scope.show = function() {
            alert($scope.vorname);
        };
    });