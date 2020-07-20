const StringMask = require('string-mask');

const LongPrefixPattern = new StringMask('(000)000-0000');
const CompleteLongPrefixPattern = new StringMask('+000 000 000-000');
const ShortPrefixPattern = new StringMask('(00)000-0000');
const CompleteShortPrefixPattern = new StringMask('+000 00 000-000');

module.exports = {
    LongPrefixPattern,
    CompleteLongPrefixPattern,
    ShortPrefixPattern,
    CompleteShortPrefixPattern
};