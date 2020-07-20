'use strict';

const { LongPrefixPattern, ShortPrefixPattern, CompleteShortPrefixPattern, CompleteLongPrefixPattern } = require('../masks/phone.masks');
const maskFactory = require('../helpers/mask-factory');

module.exports = maskFactory({
    clearValue: rawValue => rawValue.replace(/\D/g, ''),
    format: cleanValue => {
        const formattedValue = chooseFormat(cleanValue);

        return (formattedValue || '').trim().replace(/\D$/, '');
    },
    validations: {
        phone: value => value.length <= 12
    }
});

function chooseFormat(cleanValue) {
    if (cleanValue.length == 12)
        return CompleteLongPrefixPattern.apply(cleanValue);
    if (cleanValue.length == 11)
        return CompleteShortPrefixPattern.apply(cleanValue);
    if (cleanValue.length >= 9)
        return LongPrefixPattern.apply(cleanValue);

    return ShortPrefixPattern.apply(cleanValue);
}
