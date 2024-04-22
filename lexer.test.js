// lexer.test.js

const { Lexer, Token } = require('./lexer'); // Import both Lexer and Token from lexer.js

describe('Lexer', () => {
    test('Tokenize input code', () => {
        const inputCode = 'HelloWorld; cat; repeater; reverse; multiply;';
        const lexer = new Lexer(inputCode);
        const tokens = lexer.tokenize();
        expect(tokens.length).toBe(5);
        expect(tokens[0].type).toBe('KEYWORD');
        expect(tokens[0].value).toBe('HelloWorld');
        // Add more assertions to verify tokenization
    });
});

module.exports = { Lexer };
