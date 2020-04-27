const StringMask = require('string-mask');

const OldPattern = new StringMask('SSS-000');
const NewCarPattern = new StringMask('SSSS-000');
const MotorcyclePattern = new StringMask('000-SSSS');

module.exports = {
    OldPattern,
    NewCarPattern,
    MotorcyclePattern
};