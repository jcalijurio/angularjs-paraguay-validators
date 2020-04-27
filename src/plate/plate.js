'use strict';

const { OldPattern, NewCarPattern, MotorcyclePattern } = require('../masks/plate.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
    format: cleanValue => {
        let pattern = MotorcyclePattern;

        if (/^[A-Za-z]{3}\d/.test(cleanValue))
            pattern = OldPattern;
        else if (/^[A-Za-z]{1,4}/.test(cleanValue))
            pattern = NewCarPattern;

        return (pattern.apply(cleanValue) || '').trim().replace(/[^A-Z0-9]$/, '');
    },
    validations: {
        ruc: value => value.length < 6 || validator.Plate.validate(value)
    }
});