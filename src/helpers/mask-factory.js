'use strict';

// Example from https://github.com/assisrafael/angular-input-masks/blob/master/src/helpers/mask-factory.js
module.exports = function maskFactory(maskDefinition) {
    return () => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$formatters.push(function formatter(value) {
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }

                    var cleanValue = maskDefinition.clearValue(value.toString(), attrs);
                    return maskDefinition.format(cleanValue);
                });

                ctrl.$parsers.push(function parser(value) {
                    if (ctrl.$isEmpty(value)) {
                        return value;
                    }

                    var cleanValue = maskDefinition.clearValue(value.toString(), attrs);
                    var formattedValue = maskDefinition.format(cleanValue);

                    if (ctrl.$viewValue !== formattedValue) {
                        ctrl.$setViewValue(formattedValue);
                        ctrl.$render();
                    }

                    return cleanValue;
                });

                angular.forEach(maskDefinition.validations, function (validatorFn, validationErrorKey) {
                    ctrl.$validators[validationErrorKey] = function validator(modelValue, viewValue) {
                        return ctrl.$isEmpty(modelValue) || validatorFn(modelValue, viewValue, attrs);
                    };
                });
            }
        };
    };
};