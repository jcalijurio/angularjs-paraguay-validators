const { generalRUCLink, companyRUCLink, individualRUCLink,
    generalCarPlate, oldCarPlate, newCarPlate, motorCyclePlate } = require('./links');

angular.module('paraguay.validators', [])
    .directive('ruc', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: generalRUCLink
        };
    }])
    .directive('companyRuc', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: companyRUCLink
        };
    }])
    .directive('individualRuc', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: individualRUCLink
        };
    }])
    .directive('carPlate', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: generalCarPlate
        };
    }])
    .directive('oldCarPlate', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: oldCarPlate
        };
    }])
    .directive('newCarPlate', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: newCarPlate
        };
    }])
    .directive('motorcyclePlate', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: motorCyclePlate
        };
    }]);