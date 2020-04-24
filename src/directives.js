const { ParaguayValidators } = require('paraguay-validators');
const adjustRegex = /\D/;
const validator = new ParaguayValidators();

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
    }]);


const generalRUCLink = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.ruc = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        const adjustedValue = viewValue.replace(adjustRegex, '');
        if (adjustedValue.length < 8)
            return true;

        return validator.RUC.validateRUC(adjustedValue);
    };
};

const companyRUCLink = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.ruc = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        const adjustedValue = viewValue.replace(adjustRegex, '');
        if (adjustedValue.length < 9)
            return true;

        return validator.RUC.validateCompanyRUC(adjustedValue);
    };
};

const individualRUCLink = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.ruc = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        const adjustedValue = viewValue.replace(adjustRegex, '');
        if (adjustedValue.length < 8)
            return true;

        return validator.RUC.validateIndividualRUC(adjustedValue);
    };
};