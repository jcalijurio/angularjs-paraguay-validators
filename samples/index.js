angular.module('home', ['paraguay.validators'])
    .controller('ctrl-home', ['$scope', function ($scope) {
        $scope.rucs = {};
        $scope.plates = {};
    }]);