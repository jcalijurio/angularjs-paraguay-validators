'use strict';

const { IndividualPattern } = require('../masks/ruc.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/\D/g, ''),
    format: cleanValue => (IndividualPattern.apply(cleanValue) || '').trim().replace(/\D$/, ''),
    validations: {
        ruc: value => value.length < 8 || validator.RUC.validateIndividualRUC(value)
    }
});