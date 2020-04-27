'use strict';

const { CompanyPattern } = require('../masks/ruc.masks');
const validator = require('../validators/validators');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/\D/g, ''),
    format: cleanValue => (CompanyPattern.apply(cleanValue) || '').trim().replace(/\D$/, ''),
    validations: {
        ruc: value => value.length < 9 || validator.RUC.validateCompanyRUC(value)
    }
});