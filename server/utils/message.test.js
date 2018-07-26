var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


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

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        let from = 'Admin';
        let latitude = 97;
        let longitude = 38;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`
        
        let locationTest = generateLocationMessage(from, latitude, longitude);
        expect(locationTest.from).toEqual(from);
        expect(locationTest.url).toEqual(url);
        expect(typeof locationTest.createdAt).toBe('number');
    });
});