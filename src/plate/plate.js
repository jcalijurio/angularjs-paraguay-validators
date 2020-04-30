'use strict';

const { OldPattern, NewCarPattern, MotorcyclePattern } = require('../masks/plate.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

const newCarRegex = /^[A-Z]{4}\d{0,3}$/;
const oldCarRegex = /^[A-Z]{1,3}\d{0,3}$/;
const newMotoRegex = /^\d{1,3}[A-Z]{0,4}$/;

module.exports = maskFactory({
    clearValue: rawValue => {
        let adjustedValue = rawValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

        if (/^\d+/.test(adjustedValue))
            adjustedValue = adjustedValue.replace(/^(\d{1,2})(\D+)(.*)$/g, '$1').replace(/^(\d{3})([^A-Z]+)(.*)$/g, '$1');
        else
            adjustedValue = adjustedValue.replace(/^([A-Z]{1,2})(\d+)(.*)$/g, '$1').replace(/^([A-Z]{4})(\D+)(.*)$/g, '$1')
                .replace(/^([A-Z]{3})(\d{1,3})(.*)$/g, '$1$2');

        return adjustedValue;
    },
    format: cleanValue => {
        let pattern = MotorcyclePattern;

        if (newCarRegex.test(cleanValue))
            pattern = NewCarPattern;
        else if (oldCarRegex.test(cleanValue))
            pattern = OldPattern;

        return (pattern.apply(cleanValue) || '').trim().replace(/[^A-Z0-9]$/, '');
    },
    validations: {
        ruc: value => {
            let plateSize = 6;

            if (newMotoRegex.test(value) || newCarRegex.test(value))
                plateSize = 7;

            return value.length < plateSize || validator.Plate.validate(value)
        }
    }
});