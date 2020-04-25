const { ParaguayValidators } = require('paraguay-validators');
const onlyNumbersRegex = /\D/;
const validator = new ParaguayValidators();

const generalRUCLink = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.ruc = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        const adjustedValue = viewValue.replace(onlyNumbersRegex, '');
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

        const adjustedValue = viewValue.replace(onlyNumbersRegex, '');
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

        const adjustedValue = viewValue.replace(onlyNumbersRegex, '');
        if (adjustedValue.length < 8)
            return true;

        return validator.RUC.validateIndividualRUC(adjustedValue);
    };
};

const generalCarPlate = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.carplate = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        if (viewValue.length < 6)
            return true;

        return validator.Plate.validate(viewValue);
    };
};

const oldCarPlate = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.carplate = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        if (viewValue.length < 6)
            return true;

        return validator.Plate.validateOldPlate(viewValue);
    };
};

const newCarPlate = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.carplate = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        if (viewValue.length < 7)
            return true;

        return validator.Plate.validateCarPlate(viewValue);
    };
};

const motorCyclePlate = (scope, elm, attr, ctrl) => {
    if (!ctrl) return;

    ctrl.$validators.carplate = (modelValue, viewValue) => {
        if (!viewValue)
            return true;

        if (viewValue.length < 7)
            return true;

        return validator.Plate.validateMotorcyclePlate(viewValue);
    };
};

module.exports = {
    generalRUCLink,
    companyRUCLink,
    individualRUCLink,
    generalCarPlate,
    oldCarPlate,
    newCarPlate,
    motorCyclePlate
};