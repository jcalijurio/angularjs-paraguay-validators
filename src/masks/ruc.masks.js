const StringMask = require('string-mask');

const CompanyPattern = new StringMask('00.000.000-0');
const IndividualPattern = new StringMask('0.000.000-0');

module.exports = {
    IndividualPattern,
    CompanyPattern
};