'use strict';

const { OldPattern } = require('../masks/plate.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
                            .replace(/^[^A-Z]+/, '').replace(/^([A-Z]{1,2})(\d+)(.*)$/g, '$1')
                            .replace(/^([A-Z]{3})(\D+)(.*)$/g, '$1'),
    format: cleanValue => (OldPattern.apply(cleanValue) || '').trim().replace(/[^A-Z0-9]$/, ''),
    validations: {
        ruc: value => value.length < 6 || validator.Plate.validateOldPlate(value)
    }
});