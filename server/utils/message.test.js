var expect = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate the Correct Message object', () => {
        let from = 'Silas';
        let text = 'Some message'
        let msgTest = generateMessage(from, text);

        // console.log(msgTest);
        expect(msgTest.from).toEqual(from);
        expect(msgTest.text).toEqual(text);
        expect(typeof msgTest.createdAt).toBe('number');
    });

});