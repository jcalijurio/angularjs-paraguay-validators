'use strict';

const { MotorcyclePattern } = require('../masks/plate.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/[^A-Za-z0-9]/g, '').toUpperCase().replace(/^\D+/g, '')
                            .replace(/^(\d{1,2})(\D+)(.*)$/g, '$1').replace(/^(\d{3})([^A-Z]+)(.*)$/g, '$1')
                            .replace(/^(\d{3})([A-Z]+)(\d+)(.*)$/g, '$1$2'),
    format: cleanValue => (MotorcyclePattern.apply(cleanValue) || '').trim().replace(/[^A-Z0-9]$/, ''),
    validations: {
        ruc: value => value.length < 7 || validator.Plate.validateMotorcyclePlate(value)
    }
});