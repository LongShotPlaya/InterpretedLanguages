const Parser = require('./parser');

describe('Parser', () => {
    test('Parse input code', () => {
        const tokens = [
            { type: 'IDENTIFIER', value: 'cat' },
            { type: 'LPAREN', value: '(' },
            { type: 'STRING', value: '"Hello"' },
            { type: 'RPAREN', value: ')' },
            { type: 'SEMICOLON', value: ';' },
            { type: 'IDENTIFIER', value: 'multiply' },
            { type: 'LPAREN', value: '(' },
            { type: 'NUMBER', value: '2' },
            { type: 'COMMA', value: ',' },
            { type: 'NUMBER', value: '4' },
            { type: 'RPAREN', value: ')' },
            { type: 'SEMICOLON', value: ';' },
        ];
        const parser = new Parser(tokens);
        expect(() => parser.parse()).not.toThrow();
    });
});

module.exports = Parser;
