'use strict';

const { NewCarPattern } = require('../masks/plate.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase().replace(/^[^A-Z]/, ''),
    format: cleanValue => (NewCarPattern.apply(cleanValue) || '').trim().replace(/[^A-Z0-9]$/, ''),
    validations: {
        ruc: value => value.length < 7 || validator.Plate.validateCarPlate(value)
    }
});