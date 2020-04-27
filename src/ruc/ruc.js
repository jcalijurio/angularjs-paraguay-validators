'use strict';

const { CompanyPattern, IndividualPattern } = require('../masks/ruc.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/\D/g, ''),
    format: cleanValue => {
        let formattedValue;

        if (cleanValue.length >= 9)
            formattedValue = CompanyPattern.apply(cleanValue);
        else
            formattedValue = IndividualPattern.apply(cleanValue);

        return (formattedValue || '').trim().replace(/\D$/, '');
    },
    validations: {
        ruc: value => value.length < 8 || validator.RUC.validateRUC(value)
    }
});