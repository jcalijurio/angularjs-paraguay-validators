'use strict';

const { ZipCodePattern } = require('../masks/zipcode.masks');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/\D/g, ''),
    format: cleanValue => {
        const formattedValue = ZipCodePattern.apply(cleanValue);

        return (formattedValue || '').trim().replace(/\D$/, '');
    },
    validations: {
        zipcode: value => value.length <= 4
    }
});