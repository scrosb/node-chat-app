var expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        let testNum = 23434;
        expect(isRealString(testNum)).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        let unreal = '  ';
        expect(isRealString(unreal)).toBe(false);
    });

    it('should return true with correct strings', () => {
        let actual = '   hesehfsdfhw234636llo   ';
        expect(isRealString(actual)).toBe(true);

    });
    
});