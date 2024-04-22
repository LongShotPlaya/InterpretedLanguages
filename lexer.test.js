const Lexer = require('./lexer');

describe('Lexer', () => {
    test('Tokenize input code', () => {
        const inputCode = 'cat(\'Hello\', World);';
        const lexer = new Lexer(inputCode);
        const tokens = lexer.tokenize();
        expect(tokens.length).toBe(7); // Adjusted for the new tokens
        expect(tokens[0].value).toBe('cat');
        expect(tokens[1].value).toBe('(');
        expect(tokens[2].value).toBe('\'Hello\'');
        expect(tokens[3].value).toBe(',');
        expect(tokens[4].value).toBe('World');
        expect(tokens[5].value).toBe(')');
        expect(tokens[6].value).toBe(';');
    });

    test('Tokenize empty input code', () => {
        const inputCode = '';
        const lexer = new Lexer(inputCode);
        const tokens = lexer.tokenize();
        expect(tokens.length).toBe(0);
    });
});

module.exports = { Lexer };
