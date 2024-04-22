// parser.test.js

const { Lexer } = require('./lexer'); // Import Lexer from lexer.js
const Parser = require('./parser'); // Import Parser from parser.js

describe('Parser', () => {
    test('Parse tokens', () => {
        const inputCode = 'HelloWorld; cat; repeater; reverse; multiply;';
        const lexer = new Lexer(inputCode);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        parser.parse();
        // Add assertions to verify parsing
    });
});
